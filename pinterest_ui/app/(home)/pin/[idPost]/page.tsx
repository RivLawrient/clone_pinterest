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
      <div className={`placeholder: block md:hidden`}>
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
        <div className={`flex w-full justify-center`}>
          <SaveBtn
            post={post as Post}
            setPost={setPost as React.Dispatch<React.SetStateAction<Post>>}
          />
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
              className={`flex flex-col shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px] md:flex-row md:overflow-hidden md:rounded-[32px]`}
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
