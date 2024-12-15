"use client";
import { useEffect } from "react";
import { usePost } from "./(postContext)/Post";
import Masonry from "./(Component)/(Masonry)/masonry";
export default function Home() {
  const { post, setPost, postLoading, moreLoading, loadMorePosts } = usePost();

  useEffect(() => {
    if (post.length == 0) {
      loadMorePosts();
    }
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        if (!moreLoading) {
          loadMorePosts();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post, moreLoading]);

  return (
    <>
      {postLoading ? (
        <div className="flex w-screen justify-center md:pt-20">LOADING....</div>
      ) : Array.isArray(post) && post.length == 0 ? (
        <div className="mt-20 flex w-screen justify-center">
          Post is not found
        </div>
      ) : (
        <div className="md:pt-20">
          <Masonry post={post} setPost={setPost} />
        </div>
      )}
    </>
  );
}
