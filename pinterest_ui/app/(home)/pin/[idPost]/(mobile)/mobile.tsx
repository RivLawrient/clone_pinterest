import Link from "next/link";
import { Post } from "../../../(postContext)/Post";
import ProfileImage from "../../../(Component)/profileImage";
import SaveBtn from "../../../(Component)/saveBtn";
import React, { useEffect, useRef, useState } from "react";
import { useNotif } from "@/app/(notifContext)/Notif";
import { useUser } from "@/app/(userContext)/User";
import { LikeBtn } from "../likeBtn";

export function Mobile({
  post,
  setPost,
}: {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const { setMsg, setIsError, triggerNotif } = useNotif();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (showMore || showMsg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      // Bersihkan efek ketika komponen dilepas
      document.body.style.overflow = "";
    };
  }, [showMore, showMsg]);

  const handleDownload = async () => {
    try {
      const res = await fetch(post.image);
      if (!res.ok) throw new Error("File tidak ditemukan");

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${post.image.split("/").pop()}`;
      link.click();
    } catch (err) {}
  };

  function Msg() {
    return (
      <div
        onClick={() => setShowMsg(false)}
        className={`fixed inset-0 z-[5] flex h-full w-screen items-end overflow-hidden bg-black/80 md:hidden`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex w-screen flex-col rounded-t-[32px] bg-white pb-4 pt-8`}
        >
          msg
        </div>
      </div>
    );
  }

  function More() {
    const handleDelete = async () => {
      setLoading(true);
      await fetch(`${process.env.HOST_API_PUBLIC}/post/${post.id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            setMsg("success remove post");
            setIsError(false);
            triggerNotif();
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            setMsg("something error");
            setIsError(true);
            triggerNotif();
          }
        })
        .finally(() => setLoading(false));
    };

    return (
      <div
        onClick={() => setShowMore(false)}
        className={`fixed inset-0 z-[5] flex h-full w-screen items-end overflow-hidden bg-black/80 md:hidden`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex w-screen flex-col rounded-t-[32px] bg-white pb-4 pt-8`}
        >
          {user?.username == post.user.username && (
            <a
              onClick={handleDownload}
              className={`w-full cursor-pointer rounded-lg p-4 py-2 text-start text-[16px] font-semibold hover:bg-black/40 active:bg-black/50`}
            >
              Delete post
            </a>
          )}
          <a
            onClick={handleDownload}
            className={`w-full cursor-pointer rounded-lg p-4 py-2 text-start text-[16px] font-semibold hover:bg-black/40 active:bg-black/50`}
          >
            Download image
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {showMsg && <Msg />}
      {showMore && <More />}
      {!showMore && (
        <div
          onClick={() => setShowMore(true)}
          className={`absolute right-0 z-[4] m-2 flex size-[48px] flex-none items-center justify-center rounded-full bg-slate-50/50 md:hidden`}
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
          </svg>
        </div>
      )}

      <div className={`flex flex-col justify-between py-3 md:hidden`}>
        <div className={`flex w-full items-center justify-between px-3`}>
          {post?.user && (
            <div className={`flex items-center`}>
              <Link href={`/${post.user.username}`}>
                <ProfileImage user={post?.user} width={48} />
              </Link>
              <div className={`ml-2 flex flex-col`}>
                <Link
                  href={`/${post?.user.username}`}
                  className={`text-[16px] leading-none`}
                >
                  {post?.user.username}
                </Link>
                <div className={`text-[16px] leading-none`}>
                  {post?.user.follow?.follower_count
                    ? post?.user.follow.follower_count + " follower"
                    : ""}
                </div>
              </div>
            </div>
          )}

          <LikeBtn
            post={post}
            setPost={
              setPost as React.Dispatch<React.SetStateAction<Post | null>>
            }
          />
        </div>
        <div className={`flex w-full items-stretch justify-around py-3`}>
          <div
            onClick={() => setShowMsg(true)}
            className={`flex size-[48px] items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="message"
              width="24"
              height="24"
            >
              <g>
                <g>
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="16" cy="12" r="1"></circle>
                  <circle cx="8" cy="12" r="1"></circle>
                  <path d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zm.83 8.36a8 8 0 0 1-11 6.08 3.26 3.26 0 0 0-1.25-.26 3.43 3.43 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 6.08-11 8 8 0 0 1 9.19 9.19z"></path>
                </g>
              </g>
            </svg>
          </div>
          <SaveBtn
            post={post as Post}
            setPost={setPost as React.Dispatch<React.SetStateAction<Post>>}
          />

          <div
            onClick={() =>
              navigator.clipboard
                .writeText(`${window.location.href}/pin/${post.id}`)
                .finally(() => {
                  setMsg("Link Coppied");
                  triggerNotif();
                })
            }
            className={`flex size-[48px] items-center justify-center`}
          >
            <svg
              aria-hidden="true"
              aria-label=""
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
            >
              <path d="M19 16c-1.03 0-1.96.4-2.67 1.04L8.92 12.8a4 4 0 0 0 0-1.6l7.41-4.24A3.97 3.97 0 0 0 23 4a4 4 0 1 0-7.92.8L7.67 9.04A3.97 3.97 0 0 0 1 12a4 4 0 0 0 6.67 2.96l7.41 4.24q-.08.4-.08.8a4 4 0 1 0 4-4"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
