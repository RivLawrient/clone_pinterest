import React, { useState } from "react";
import { Comment, Post } from "../../(postContext)/Post";
import ProfileImage from "../../(Component)/profileImage";
import Link from "next/link";
import { useUser } from "@/app/(userContext)/User";

export default function CommentDetail({
  post,
  setPost,
}: {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
}) {
  const { user } = useUser();
  const [hiddenComment, setHiddenComment] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");

  const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const diff = now.getTime() - targetDate.getTime(); // Selisih waktu dalam milidetik

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 30) return `${days} hari lalu`;
    return `${months} bulan lalu`;
  };

  async function handleComment() {
    try {
      await fetch(`${process.env.HOST_API_PUBLIC}/comment/` + post?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          comment: comment,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost((prevPost) => {
            if (!prevPost) return prevPost; // prevPost is already null
            if (user) {
              const newComment: Comment = {
                id: data.data.id,
                comment: data.data.comment,
                user: {
                  username: user.username,
                  first_name: user.first_name,
                  follow: null,
                  last_name: user.last_name,
                  profile_img: user.profile_img,
                },
                post_id: data.data.post_id,
                created_at: data.data.created_at,
              };

              return {
                ...prevPost,
                comment: [...(prevPost.comment || []), newComment],
              };
            }
            return prevPost; // Return prevPost explicitly to handle other cases
          });

          setComment("");
        }
      });
    } catch {
    } finally {
    }
  }

  return (
    <>
      <div
        className={`m-4 grow ${!hiddenComment ? "overflow-hidden" : "overflow-y-scroll"}`}
      >
        <div className={`mb-8 mt-4 flex w-full justify-between`}>
          <div className={`flex items-center`}>
            {post?.user && (
              <Link href={`/${post.user.username}`}>
                <ProfileImage user={post?.user} width={24} />
              </Link>
            )}
            <div className={`ml-2 flex flex-col`}>
              <Link href={`/${post?.user.username}`} className={`leading-none`}>
                {post?.user.username}
              </Link>
              <div className={`text-[14px] leading-none`}>
                {post?.user.follow?.follower_count
                  ? post?.user.follow.follower_count + " follower"
                  : ""}
              </div>
            </div>
          </div>

          <div className={``}>
            {post?.user.username == user?.username ? null : post?.user.follow
                ?.follow_status ? (
              <div
                className={`cursor-pointer rounded-full border bg-white px-4 py-3 hover:bg-slate-100`}
              >
                Following
              </div>
            ) : (
              <div
                className={`cursor-pointer rounded-full border bg-white px-4 py-3 hover:bg-slate-100`}
              >
                Follow
              </div>
            )}
          </div>
        </div>
        {post?.comment && post.comment.length > 0 ? (
          <>
            <div
              onClick={() => setHiddenComment(!hiddenComment)}
              className="flex cursor-pointer select-none items-center justify-between text-[16px] font-semibold"
            >
              {post.comment.length} Comments{" "}
              <svg
                aria-label="Perluas ikon"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
              </svg>
            </div>
            {hiddenComment && (
              <div className={`pr-8`}>
                {post.comment.map((value: Comment, index: number) => (
                  <div key={index} className={`my-2 flex w-full gap-2`}>
                    <Link
                      href={`/${value.user.username}`}
                      className={`flex-none`}
                    >
                      <ProfileImage user={value.user} width={32} />
                    </Link>
                    <div className={`h-auto flex-col leading-none`}>
                      <Link
                        href={`/${value.user.username}`}
                        className={`mr-2 text-[16px] font-semibold`}
                      >
                        {value.user.username}
                      </Link>
                      {value.comment}
                      <div className={`mt-1 text-[14px] text-[#767676]`}>
                        {getRelativeTime(value.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`flex grow flex-col text-[16px]`}>
              <div className={`my-2 font-semibold`}>No comments yet</div>
              <div className={`my-2 text-[#767676]`}>
                No comments yet! Add one to start a conversation.
              </div>
            </div>
          </>
        )}
      </div>
      <div className={`m-2 flex items-center gap-1`}>
        <div
          className={`flex w-full items-center gap-2 rounded-full border px-4 py-2 text-[16px] text-black`}
        >
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.currentTarget.value);
            }}
            max={100}
            type="text"
            placeholder="Add a comment"
            className={`grow leading-none outline-none`}
          />
          <div
            onClick={() => {
              comment && handleComment();
            }}
            // onClick={() => sendMessage("like_post")}
            className={`z-[3] flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-[#e60023] hover:bg-red-800`}
          >
            <svg
              aria-hidden="true"
              aria-label=""
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
              className={`fill-white`}
            >
              <path d="m.46 2.43-.03.03c-.4.42-.58 1.06-.28 1.68L3 10.5 16 12 3 13.5.15 19.86c-.3.62-.13 1.26.27 1.67l.05.05c.4.38 1 .56 1.62.3l20.99-8.5q.28-.12.47-.3l.04-.04c.68-.71.51-2-.51-2.42L2.09 2.12Q1.79 2 1.49 2q-.61.01-1.03.43"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
