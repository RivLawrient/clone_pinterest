"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../(postContext)/Post";
import { useUser } from "@/app/(userContext)/User";
import SaveBtn from "../../(Component)/saveBtn";
import ProfileImage from "../../(Component)/profileImage";
import Link from "next/link";

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

  const [comment, setComment] = useState<boolean>(false);
  const [hiddenComment, setHiddenComment] = useState<boolean>(false);

  console.log(refWidth.current?.getBoundingClientRect());
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
    setIsloading(true);
    try {
      fetch("http://127.0.0.1:4000/post/" + path.replace("/pin/", ""), {
        method: "GET",
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost(data.data);
        }
      });
    } catch (err) {
    } finally {
      setIsloading(false);
    }

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

        <img src={post.image} alt="" className="rounded-[32px] duration-1000" />

        <SaveBtn
          eachPost={post}
          setEachPost={setPost}
          setPost={null}
          post={null}
        />
      </div>
    );
  };

  return (
    <>
      <ShowDetailImg />
      <div className={`relative mt-24 flex w-screen justify-center`}>
        {isloading ? (
          <div className={`font-semibold`}>Loading...</div>
        ) : (
          <>
            <div
              onClick={() => router.back()}
              className={`fixed left-5 flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200`}
            >
              <svg
                aria-hidden="true"
                aria-label=""
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
              </svg>
            </div>
            <div
              style={{
                maxWidth: `calc(100vw - 400px)`,
                maxHeight: `calc(100vh - 150px)`,
                minHeight: `calc(100vh - 300px)`,
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
                <img
                  ref={refImg}
                  src={post?.image}
                  alt=""
                  onLoad={handleImageLoad}
                  className={`z-[1] rounded-l-[32px] object-cover`}
                />
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
                        <div
                          className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 120 120"
                            width={24}
                            id="vector"
                          >
                            <path
                              id="face"
                              d="M 66.72 17.122 L 60 23.897 L 53.28 17.122 C 41.084 4.959 21.305 4.959 9.109 17.122 C -3.036 29.331 -3.036 49.136 9.109 61.345 L 60 111.636 L 110.891 61.345 C 123.036 49.136 123.036 29.331 110.891 17.122 C 104.793 11.041 96.799 8 88.805 8 C 80.811 8 72.818 11.041 66.72 17.122 Z"
                              fill="#ff5246"
                              stroke-width="1"
                            />
                            <g id="group">
                              <path
                                id="left_eye"
                                d="M 32.727 48.909 C 32.727 53.428 36.391 57.091 40.909 57.091 C 45.428 57.091 49.091 53.428 49.091 48.909 C 49.091 44.391 45.428 40.727 40.909 40.727 C 36.391 40.727 32.727 44.391 32.727 48.909 Z"
                                fill="#720906"
                                stroke-width="1"
                              />
                              <path
                                id="right_eye"
                                d="M 70.909 48.909 C 70.909 53.428 74.572 57.091 79.091 57.091 C 83.61 57.091 87.273 53.428 87.273 48.909 C 87.273 44.391 83.61 40.727 79.091 40.727 C 74.572 40.727 70.909 44.391 70.909 48.909 Z"
                                fill="#720906"
                                stroke-width="1"
                              />
                            </g>
                            <path
                              id="mouth"
                              d="M 60 66.8 C 54.1 66.8 48.6 65.5 43.7 63.1 C 43.9 72 51.1 79.1 60 79.1 C 68.9 79.1 76.2 71.9 76.3 63.1 C 71.4 65.4 65.9 66.8 60 66.8 Z"
                              fill="#720906"
                              stroke-width="1"
                            />
                          </svg>

                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            // style='filter: url("#none") brightness(1) contrast(1) saturate(1) grayscale(0) invert(0) blur(0px) sepia(0) hue-rotate(0deg);'
                          >
                            <path
                              d="M5.93992 6C6.85992 6 7.76992 6.37 8.42992 7.02L9.90992 8.46L11.9999 10.5L14.0899 8.46L15.5699 7.02C16.2399 6.37 17.1399 6 18.0599 6C18.5499 6 19.2599 6.11 19.9099 6.63C20.5699 7.16 20.9599 7.9 20.9999 8.71C21.0399 9.52 20.7299 10.28 20.1399 10.86L20.0699 10.93L19.9999 11.01C19.9399 11.08 14.4099 17.23 11.9999 19.76C9.58992 17.22 4.05992 11.07 3.99992 11.01L3.93992 10.93L3.85992 10.86C3.26992 10.28 2.96992 9.52 2.99992 8.71C3.03992 7.9 3.42992 7.16 4.08992 6.63C4.72992 6.11 5.44992 6 5.93992 6ZM18.0599 3C16.3999 3 14.7299 3.65 13.4799 4.87C13.1099 5.23 11.9999 6.31 11.9999 6.31C11.9999 6.31 10.8899 5.23 10.5199 4.87C9.26992 3.65 7.59992 3 5.93992 3C4.60992 3 3.28992 3.42 2.20992 4.29C-0.580081 6.54 -0.730081 10.57 1.76992 13.01C1.76992 13.01 8.05992 20.02 10.2499 22.27C10.7199 22.76 11.3599 23 11.9999 23C12.6399 23 13.2799 22.76 13.7499 22.27C15.9399 20.02 22.2299 13.01 22.2299 13.01C24.7299 10.58 24.5799 6.54 21.7899 4.29C20.7099 3.42 19.3899 3 18.0599 3Z"
                              fill="#111111"
                            />
                          </svg> */}
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
                    {comment ? (
                      <>
                        <div
                          onClick={() => setHiddenComment(!hiddenComment)}
                          className="flex cursor-pointer items-center justify-between pr-8 text-[16px] font-semibold"
                        >
                          25 Comments{" "}
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
                            <div className={`h-[50000px]`}>anjai</div>
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
                    {/* {!hiddenComment && <div className=""></div>} */}
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
                        type="text"
                        placeholder="Add a comment"
                        className={`grow outline-none`}
                      />
                      <div
                        className={`flex size-[32px] items-center justify-center rounded-full bg-[#e60023]`}
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
    </>
  );
}
