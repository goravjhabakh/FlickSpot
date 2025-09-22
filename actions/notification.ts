'use server';

import { getDbUserId } from "@/actions/user";
import prisma from "@/lib/prisma";

export const getNotifications = async() => {
    try {
        const userId = await getDbUserId();
        if (!userId) return [];

        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        content: true,
                        image: true
                    }
                },
                comment: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return notifications;
    } catch (error) {
        console.log('Error fetching notifications : ', error);
        throw new Error('Failed to fetch notifications');
    }
}

export const markNotificationAsRead = async(notificationIds: string[]) => {
    try {  
        await prisma.notification.updateMany({
            where: {
                id: {
                    in: notificationIds
                }
            },
            data: {
                read: true
            }
        })
        return {success: true};
    } catch (error) {
        console.log('Error marking notifications as read : ', error);
        return {success: false};
    }
}