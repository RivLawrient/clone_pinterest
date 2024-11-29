"use client";
import { useEffect } from "react";
import { usePost } from "./(postContext)/Post";
import Masonry from "./(Masonry)/masonry";

export default function Home() {
  const { post, setPost, postLoading, loadMorePosts } = usePost();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        if (!postLoading) {
          loadMorePosts();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postLoading, loadMorePosts]);
  return (
    <>
      {post && (
        <div className="mt-[80px]">
          <Masonry post={post} setPost={setPost} />
        </div>
      )}
    </>
  );
}
