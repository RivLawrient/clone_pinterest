"use client";
import { useEffect } from "react";
import { usePost } from "./(postContext)/Post";
import Masonry from "./(Component)/(Masonry)/masonry";
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
    //     <>
    //       {postLoading ? (
    //         <div className="mt-20 flex w-screen justify-center">LOADING...J</div>
    //       ) : post &&

    //           post.length == 0 (
    // <div className="mt-20 flex w-screen justify-center">
    //           post is not found
    //         </div>
    //           ):
    //           (
    // <div className="mt-[80px]">
    //           <Masonry post={post} setPost={setPost} />
    //         </div>
    //           )

    //       )
    //     </>
    <>
      {postLoading ? (
        <div className="mt-20 flex w-screen justify-center">LOADING...</div>
      ) : Array.isArray(post) && post.length === 0 ? (
        <div className="mt-20 flex w-screen justify-center">
          Post is not found
        </div>
      ) : (
        <div className="mt-[80px]">
          <Masonry post={post} setPost={setPost} />
        </div>
      )}
    </>
  );
}
