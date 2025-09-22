import { getProfile, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile";
import ProfilePageClient from "./ProfilePageClient";

export const generateMetadata = async({params}: {params: {username: string}}) => {
    const user = await getProfile(params.username);
    if (!user) return;
    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`
    }
}

const ProfilePageServer = async({params}: {params: {username: string}}) => {
    const user = await getProfile(params.username);
    if (!user) return;

    const [posts, likedPosts, isFollowingCurrentUser] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id)
    ])

    return (
        <div>
            <ProfilePageClient 
                user={user}
                posts={posts}
                likedPosts={likedPosts}
                isFollowing={isFollowingCurrentUser}
            />
        </div>
    )
}

export default ProfilePageServer;