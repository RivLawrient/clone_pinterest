"use client";

import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../(postContext)/Post";
import { usePathname } from "next/navigation";
import { BackBtn } from "./backBtn";
import { useUser } from "@/app/(userContext)/User";
import SaveBtn from "../../(Component)/saveBtn";
import { LikeBtn } from "./likeBtn";
import CommentDetail from "./commentList";
import { ShareBtn } from "../../(Component)/shareBtn";
import { MoreBtn } from "../../(Component)/moreBtn";
import Link from "next/link";
import ProfileImage from "../../(Component)/profileImage";

export interface Sizes {
  height: number;
  width: number;
}

export default function PagePost() {
  const { user } = useUser();
  const [post, setPost] = useState<Post>();
  const [loadingPost, setLoadingPost] = useState<boolean>(true);

  const refImg = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<Sizes>({
    height: 0,
    width: 0,
  });
  const path = usePathname();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.HOST_API_PUBLIC}/post/${path.replace("/pin/", "")}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost(data.data);
        }
      })
      .finally(() => {
        setLoadingPost(false);
      });

    const handleResize = () => {
      refImg.current &&
        setSize({
          height: refImg.current.clientHeight,
          width: refImg.current.clientWidth,
        });
      console.log(refImg.current?.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function FullImage() {
    return (
      <>
        {isFullscreen && (
          <div
            className="fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-90 md:p-2"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              onClick={() => setIsFullscreen(false)}
              className="absolute top-0 m-4 flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-white p-4"
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

            <img
              src={post?.image}
              alt=""
              className="size-full max-h-full max-w-full cursor-zoom-out object-contain"
            />
          </div>
        )}
      </>
    );
  }

  function Desktop() {
    return (
      <div
        style={{
          width: `calc(${size.width}px)`,
          maxHeight: `calc(${size.height}px)`,
        }}
        className={`hidden flex-col border-l md:flex md:min-w-[30vw]`}
      >
        {/* // top */}
        <div className={`m-2 flex justify-between`}>
          <div className={`flex items-center`}>
            <LikeBtn
              post={post as Post}
              setPost={
                setPost as React.Dispatch<React.SetStateAction<Post | null>>
              }
            />
            <div>{post?.total_like ? post.total_like : null}</div>
            <ShareBtn post={post as Post} size={48} />
            {user?.username == post?.user.username ? (
              <MoreBtn post={post as Post} size={48} isMe={true} />
            ) : (
              <MoreBtn post={post as Post} size={48} isMe={false} />
            )}
          </div>
          <div>
            <SaveBtn
              post={post as Post}
              setPost={setPost as React.Dispatch<React.SetStateAction<Post>>}
            />
          </div>
        </div>
        {/* detail */}
        <div className={`mx-4`}>
          <div className={`text-[28px] font-semibold`}>{post?.title}</div>
          <div className={`text-[14px]`}>{post?.description}</div>
        </div>
        <CommentDetail post={post as Post} setPost={setPost} />
      </div>
    );
  }

  function Mobile() {
    return (
      <div className={`flex h-full flex-col justify-between py-3 md:hidden`}>
        <div className={`flex items-center px-3`}>
          {post?.user && (
            <Link href={`/${post.user.username}`}>
              <ProfileImage user={post?.user} width={48} />
            </Link>
          )}
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
        <div className={`flex w-full items-stretch justify-around`}>
          <div className={`flex size-[48px] items-center justify-center`}>
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
          <div className={`flex size-[48px] items-center justify-center`}>
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
    );
  }

  return (
    <>
      <FullImage />
      <div className={`flex w-full justify-center md:pt-24`}>
        {loadingPost ? (
          <div>LOADING ...</div>
        ) : post ? (
          <>
            <BackBtn />
            <div
              className={`flex h-screen flex-col shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px] md:h-fit md:flex-row md:overflow-hidden md:rounded-[32px]`}
            >
              <div className={`relative`}>
                <div
                  onClick={() => setIsFullscreen(true)}
                  className={`absolute bottom-0 right-0 m-4 hidden cursor-pointer items-center justify-center rounded-full bg-white hover:brightness-90 md:flex`}
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
                  src={post.image}
                  alt=""
                  onClick={() => setIsFullscreen(true)}
                  onLoad={() => {
                    refImg.current &&
                      setSize({
                        height: refImg.current.clientHeight,
                        width: refImg.current.clientWidth,
                      });
                  }}
                  className={`max-h-[calc(85vh)] min-h-[calc(50vh)] min-w-[calc(100vw)] object-cover md:min-w-[calc(20vw)] md:max-w-[calc(45vw)]`}
                />
              </div>
              <Desktop />
              <Mobile />
            </div>
          </>
        ) : (
          <div>SOMETHING ERROR WHEN GETTING DATA</div>
        )}
      </div>
    </>
  );
}
