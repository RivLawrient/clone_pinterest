import React, { useState } from "react";
import { Post, usePost } from "../(postContext)/Post";

export default function SaveBtn({
  eachPost,
  setEachPost,
  post,
  setPost,
}: {
  eachPost: Post;
  setEachPost: React.Dispatch<React.SetStateAction<Post | null>> | null;
  post: Post[] | null;
  setPost: React.Dispatch<React.SetStateAction<Post[]>> | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const SaveHandle = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.HOST_API_PUBLIC}/save_post/${eachPost.id}`, {
        method: "POST",
        credentials: "include",
      }).then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          if (setPost) {
            setPost(
              post?.map((p) =>
                p.id === eachPost.id ? { ...p, save_status: true } : p,
              ) || [],
            );
          } else if (setEachPost) {
            setEachPost({ ...eachPost, save_status: true });
          }
        }
      });
    } catch (err) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const UnSaveHandle = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.HOST_API_PUBLIC}/unsave_post/${eachPost.id}`, {
        method: "DELETE",
        credentials: "include",
      }).then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          if (setPost) {
            setPost(
              post?.map((p) =>
                p.id === eachPost.id ? { ...p, save_status: false } : p,
              ) || [],
            );
          } else if (setEachPost) {
            setEachPost({ ...eachPost, save_status: false });
          }
        }
      });
    } catch (err) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <>
      {eachPost && (
        <>
          <div
            onClick={() => {
              loading
                ? null
                : eachPost.save_status
                  ? UnSaveHandle()
                  : SaveHandle();
            }}
            className={`${eachPost.save_status ? "bg-black hover:bg-slate-800" : "bg-red-700 hover:bg-red-900"} ${loading ? "cursor-wait" : "cursor-pointer active:scale-90"} size-fit select-none rounded-full p-4 text-[16px] leading-none tracking-wide text-white transition-all`}
          >
            {eachPost.save_status
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
