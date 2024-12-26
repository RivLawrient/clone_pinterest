"use client";
import { useEffect } from "react";
import { usePost } from "./(postContext)/Post";
import Masonry from "./(Component)/(Masonry)/masonry";
export default function Home() {
  const { post, setPost, postLoading, moreLoading, loadMorePosts, isEmpty } =
    usePost();

  useEffect(() => {
    if (post && post.length == 0) {
      loadMorePosts();
    }
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        if (!moreLoading && !isEmpty) {
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
      ) : isEmpty ? (
        <div className="mt-20 flex w-screen justify-center">
          Post is not found
        </div>
      ) : (
        <div className="overflow-clip md:pt-20">
          <Masonry post={post} setPost={setPost} />
        </div>
      )}
    </>
  );
}
