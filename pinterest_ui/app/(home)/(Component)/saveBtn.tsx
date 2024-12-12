import React, { useState } from "react";
import { ListPost, Post, usePost } from "../(postContext)/Post";
import { useNotif } from "@/app/(notifContext)/Notif";

export default function SaveBtn({
  post,
  setPost,
}: {
  post: ListPost | Post;
  setPost:
    | React.Dispatch<React.SetStateAction<ListPost[]>>
    | React.Dispatch<React.SetStateAction<Post>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { setMsg, triggerNotif } = useNotif();

  function isPost(post: ListPost | Post): post is Post {
    return (post as Post).user !== undefined;
  }

  async function SaveHandle() {
    setLoading(true);
    await fetch(`${process.env.HOST_API_PUBLIC}/save_post/${post.id}`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          if (isPost(post)) {
            (setPost as React.Dispatch<React.SetStateAction<Post>>)(
              (prevPost: Post) => ({
                ...prevPost,
                save_status: !prevPost.save_status,
              }),
            );
          } else {
            (setPost as React.Dispatch<React.SetStateAction<ListPost[]>>)(
              (prevPosts: ListPost[]) =>
                prevPosts.map((p) =>
                  p.id === post.id ? { ...p, save_status: !p.save_status } : p,
                ),
            );
          }
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
        setMsg("success save post");
        triggerNotif();
      });
  }

  async function UnSaveHandle() {
    setLoading(true);
    await fetch(`${process.env.HOST_API_PUBLIC}/unsave_post/${post.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          if (isPost(post)) {
            (setPost as React.Dispatch<React.SetStateAction<Post>>)(
              (prevPost: Post) => ({
                ...prevPost,
                save_status: !prevPost.save_status,
              }),
            );
          } else {
            (setPost as React.Dispatch<React.SetStateAction<ListPost[]>>)(
              (prevPosts: ListPost[]) =>
                prevPosts.map((p) =>
                  p.id === post.id ? { ...p, save_status: !p.save_status } : p,
                ),
            );
          }
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
        setMsg("success unsave post");
        triggerNotif();
      });
  }

  return (
    <>
      {post.id && (
        <>
          <div
            onClick={() => {
              loading ? null : post.save_status ? UnSaveHandle() : SaveHandle();
            }}
            className={`${post.save_status ? "bg-black hover:bg-slate-800" : "bg-red-700 hover:bg-red-900"} ${loading ? "cursor-wait" : "cursor-pointer active:scale-90"} size-fit select-none rounded-full p-4 text-[16px] leading-none tracking-wide text-white transition-all`}
          >
            {post.save_status
              ? loading
                ? "Unsave..."
                : "Saved"
              : loading
                ? "Saving..."
                : "Save"}
          </div>
        </>
      )}
    </>
  );
}
