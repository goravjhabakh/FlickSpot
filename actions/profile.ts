'use server';

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user";

export const getProfile = async(username: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                username
            },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                location: true,
                website: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        posts: true
                    }
                }
            }
        })
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw new Error("Failed to fetch profile");
    }
}

export const getUserPosts = async(userId: string) => {
    try {
        return await prisma.post.findMany({
            where: {
                authorId: userId,
            }, 
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch user posts");
    }
}

export const getUserLikedPosts = async(userId: string) => {
    try {
        return await prisma.post.findMany({
            where: {
                likes: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        console.error("Error fetching liked posts:", error);
        throw new Error("Failed to fetch liked posts");
    }   
}

export const updateProfile = async(formData: FormData) => {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) throw new Error("Unauthorized");

        const name = formData.get("name") as string;
        const bio = formData.get("bio") as string;
        const location = formData.get("location") as string;
        const website = formData.get("website") as string;

        const user = await prisma.user.update({
            where: { clerkId },
            data: {
                name,
                bio,
                website,
                location
            }
        });

        revalidatePath('/profile')
        return {success: true, user}
    } catch (error) {
        console.error("Error updating profile:", error);
        return {success: false, error}
    }
}

export const isFollowing = async(targetUserId: string) => {
    try {
        const userId = await getDbUserId();
        if (!userId) return false;

        const follow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId
                }
            }           
        })

        return !!follow;
    } catch (error) {
        console.log('Could not determine is isFollwing',error)
        return false;
    }
}