import { getPosts } from "@/actions/post";
import { getDbUserId } from "@/actions/user";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import Suggested from "@/components/Suggested";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  if (!dbUserId) return null;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className="lg:col-span-6">
        {user ? <CreatePost/> : null}

        <div className="space-y-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post = {post} dbUserId = {dbUserId}/>
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <Suggested/>
      </div>
    </div>
  );
}

export default Home;