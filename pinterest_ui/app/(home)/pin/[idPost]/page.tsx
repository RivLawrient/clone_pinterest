"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Comment, Post } from "../../(postContext)/Post";
import { useUser } from "@/app/(userContext)/User";
import SaveBtn from "../../(Component)/saveBtn";
import ProfileImage from "../../(Component)/profileImage";
import Link from "next/link";
import { LikeBtn } from "./likeBtn";

const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setResponse(event.data); // Simpan umpan balik dari server
    };
    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket disconnected");

    return () => {
      socket.close();
    };
  }, [url]);

  // Fungsi untuk mengirim pesan
  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket not connected");
    }
  };

  return { sendMessage, response };
};

export default function PagePost() {
  const { user } = useUser();
  const path = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [view, setView] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const router = useRouter();

  const refWidth = useRef<HTMLImageElement>(null);
  const refImg = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [comment, setComment] = useState<string>("");
  const [hiddenComment, setHiddenComment] = useState<boolean>(true);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const { sendMessage, response } = useWebSocket(
    `${process.env.HOST_WS_PUBLIC}/ws`,
  );

  useEffect(() => {
    if (refWidth.current != null) {
      isloading ? null : setWidth(refWidth.current.clientWidth);
    }
  }, [refWidth.current]);

  const handleImageLoad = () => {
    if (refWidth.current) {
      setWidth(refWidth.current.clientWidth);
      setHeight(refWidth.current.clientHeight);
    }
  };

  useEffect(() => {
    fetch(`${process.env.HOST_API_PUBLIC}/post/` + path.replace("/pin/", ""), {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost(data.data);
        }
      })
      .finally(() => setIsloading(false));

    const handleResize = () => {
      if (refWidth.current) {
        setWidth(refWidth.current.clientWidth);
        setHeight(refWidth.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ShowDetailImg = () => {
    const ref = useRef<HTMLDivElement>(null);

    if (!detail || !post) return null;
    return (
      <div
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          e.target === ref.current ? setDetail(false) : null
        }
        className="fixed top-0 z-50 flex h-screen w-screen justify-between bg-black bg-opacity-85 p-4 backdrop-blur-sm"
      >
        <div
          onClick={() => {
            setDetail(false);
          }}
          className="flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-white"
        >
          <svg
            aria-hidden="true"
            aria-label=""
            className={`fill-black`}
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
          </svg>
        </div>

        <img src={post.image} alt="" className={`rounded-[32px]`} />

        <SaveBtn
          eachPost={post}
          setEachPost={setPost}
          setPost={null}
          post={null}
        />
      </div>
    );
  };

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
      <ShowDetailImg />
      {isloading ? (
        <div className="mt-20 flex w-screen justify-center">LOADING...</div>
      ) : (
        <div
          className={`relative mt-24 flex w-screen select-none justify-center`}
        >
          <div
            onClick={() => router.back()}
            className={`fixed left-6 flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200`}
          >
            <svg
              aria-hidden="true"
              aria-label=""
              height="19"
              role="img"
              viewBox="-1 0 24 24"
              width="19"
            >
              <path d="M7.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
          </div>
          {isloading ? (
            <div className={`font-semibold`}>Loading...</div>
          ) : (
            <>
              <div
                style={{
                  maxWidth: `calc(100vw - 400px)`,
                  maxHeight: `calc(100vh - 150px)`,
                  minHeight: `calc(100vh - 200px)`,
                }}
                className={`flex w-fit grow justify-center`}
              >
                <div
                  ref={refWidth}
                  style={{
                    marginRight: `calc(${refImg.current?.width ? refImg.current?.width - width : null}px)`,
                  }}
                  className={`relative -mr-8 flex min-w-[40%] max-w-[50%] justify-start`}
                >
                  <div
                    onMouseEnter={() => setView(true)}
                    onMouseLeave={() => setView(false)}
                    onClick={() => setDetail(true)}
                    style={{
                      right: `calc(${refImg.current?.width ? width - refImg.current?.width : null}px)`,
                    }}
                    className={`absolute bottom-0 z-[2] m-6 flex cursor-pointer items-center rounded-full bg-white text-[16px] font-bold hover:bg-slate-100 active:bg-slate-200`}
                  >
                    <svg
                      aria-label="closeup image action button"
                      className={`m-[14px] fill-black`}
                      height="16"
                      role="img"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <path d="M9.75 1a1.25 1.25 0 0 1 0 2.5H5.27l5.36 5.37a1.25 1.25 0 0 1-1.76 1.76L3.5 5.27v4.48a1.25 1.25 0 0 1-2.5 0V1zM20.5 14.25a1.25 1.25 0 0 1 2.5 0V23h-8.75a1.25 1.25 0 0 1 0-2.5h4.48l-5.36-5.37a1.25 1.25 0 0 1 1.76-1.76l5.37 5.36z"></path>
                    </svg>
                  </div>
                  {!detail && (
                    <img
                      ref={refImg}
                      src={post?.image}
                      alt=""
                      onLoad={handleImageLoad}
                      className={`z-[1] select-none rounded-l-[32px] object-cover`}
                    />
                  )}
                </div>
                {width > 0 && (
                  <div
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    className={`relative flex flex-col overflow-hidden rounded-r-[32px] p-8 shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px]`}
                  >
                    {post && (
                      <div className={`flex justify-between`}>
                        <div className={`ml-[-14px] flex items-center`}>
                          <LikeBtn post={post} setPost={setPost} />
                          <div>{post.total_like ? post.total_like : null}</div>
                          <div
                            className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100`}
                          >
                            <svg
                              aria-hidden="true"
                              aria-label=""
                              height="20"
                              role="img"
                              viewBox="0 0 24 24"
                              width="20"
                            >
                              <path d="M7.44 5.44a1.5 1.5 0 1 0 2.12 2.12l.94-.94v6.88a1.5 1.5 0 0 0 3 0V6.62l.94.94a1.5 1.5 0 0 0 2.12-2.12l-3.5-3.5a1.5 1.5 0 0 0-2.12 0zM5 13.5a1.5 1.5 0 0 0-3 0v5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-5a1.5 1.5 0 0 0-3 0v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z"></path>
                            </svg>
                          </div>
                          <div
                            className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100`}
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
                        </div>
                        <SaveBtn
                          eachPost={post}
                          setEachPost={setPost}
                          setPost={null}
                          post={null}
                        />
                      </div>
                    )}
                    <div className={`mt-4 text-[28px]`}>{post?.title}</div>
                    <div className={`text-[14px]`}>{post?.description}</div>

                    <div
                      className={`mr-[-32px] grow ${hiddenComment ? "overflow-hidden" : "overflow-y-scroll"}`}
                    >
                      <div className={`mb-8 mt-4 flex w-full justify-between`}>
                        <div className={`flex items-center`}>
                          {post?.user && (
                            <Link href={`/${post.user.username}`}>
                              <ProfileImage user={post?.user} width={48} />
                            </Link>
                          )}
                          <div className={`ml-2 flex flex-col`}>
                            <Link
                              href={`/${post?.user.username}`}
                              className={`leading-none`}
                            >
                              {post?.user.username}
                            </Link>
                            <div className={`text-[14px] leading-none`}>
                              {post?.user.follow?.follower_count
                                ? post?.user.follow.follower_count + " follower"
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className={`mr-[16px]`}>
                          {post?.user.username == user?.username ? null : post
                              ?.user.follow?.follow_status ? (
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
                            className="flex cursor-pointer select-none items-center justify-between pr-8 text-[16px] font-semibold"
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
                              {post.comment.map(
                                (value: Comment, index: number) => (
                                  <div
                                    key={index}
                                    className={`my-2 flex w-full gap-2`}
                                  >
                                    <Link
                                      href={`/${value.user.username}`}
                                      className={`flex-none`}
                                    >
                                      <ProfileImage
                                        user={value.user}
                                        width={32}
                                      />
                                    </Link>
                                    <div
                                      className={`h-auto flex-col leading-none`}
                                    >
                                      <Link
                                        href={`/${value.user.username}`}
                                        className={`mr-2 text-[16px] font-semibold`}
                                      >
                                        {value.user.username}
                                      </Link>
                                      {value.comment}
                                      <div
                                        className={`mt-1 text-[14px] text-[#767676]`}
                                      >
                                        {getRelativeTime(value.created_at)}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className={`flex grow flex-col text-[16px]`}>
                            <div className={`my-2 font-semibold`}>
                              No comments yet
                            </div>
                            <div className={`my-2 text-[#767676]`}>
                              No comments yet! Add one to start a conversation.
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className={`flex items-center gap-1`}>
                      {user && (
                        <div>
                          <ProfileImage
                            user={{ ...user, follow: null }}
                            width={48}
                          />
                        </div>
                      )}
                      <div
                        className={`flex w-full items-center gap-2 rounded-full border px-4 py-3 text-[16px] text-black`}
                      >
                        <input
                          value={response ? response : ""}
                          onChange={(e) => {
                            setComment(e.currentTarget.value);
                          }}
                          max={100}
                          type="text"
                          placeholder="Add a comment"
                          className={`grow outline-none`}
                        />
                        <div
                          // onClick={() => {
                          //   comment && handleComment();
                          // }}
                          onClick={() => sendMessage("like_post")}
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
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
