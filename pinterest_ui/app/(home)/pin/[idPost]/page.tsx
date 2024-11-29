"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../(postContext)/Post";
import { useUser } from "@/app/(userContext)/User";
import SaveBtn from "../../(Component)/saveBtn";
import ProfileImage from "../../(Component)/profileImage";

export default function PagePost() {
  const { user } = useUser();
  const path = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [view, setView] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const refWidth = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(0);
  console.log(refWidth);

  useEffect(() => {
    if (refWidth.current != null) {
      isloading ? null : setWidth(refWidth.current.clientWidth);
    }
  }, [refWidth.current]);

  const handleImageLoad = () => {
    if (refWidth.current) {
      setWidth(refWidth.current.clientWidth);
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
            className="fill-black"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
          </svg>
        </div>

        <img src={post.image} alt="" className="rounded-[32px]" />

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
      <div className={`mt-24 flex w-screen justify-center`}>
        {isloading ? (
          <div>isloading...</div>
        ) : (
          <div
            style={{
              maxWidth: `calc(100vw - 400px)`,
              maxHeight: `calc(100vh - 150px)`,
              minHeight: `calc(100vh - 300px)`,
            }}
            className={`flex w-fit grow justify-center`}
          >
            <div
              className={`relative z-[1] flex min-w-[35%] max-w-[50%] justify-end`}
            >
              <div
                onMouseEnter={() => setView(true)}
                onMouseLeave={() => setView(false)}
                onClick={() => setDetail(true)}
                className={`absolute bottom-0 right-0 z-[2] m-6 flex cursor-pointer items-center rounded-full bg-white text-[16px] font-bold`}
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
                ref={refWidth}
                src={post?.image}
                alt=""
                onLoad={handleImageLoad}
                className={`rounded-l-[32px] object-cover`}
              />
            </div>
            {width > 0 && (
              <div
                style={{
                  width: `${width}px`,
                }}
                className={`relative overflow-hidden rounded-r-[32px] p-8 shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px]`}
              >
                {post && (
                  <div className={`flex justify-between`}>
                    <div className={`ml-[-14px] flex items-center`}>
                      <div
                        className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          viewBox="0 0 6.3499998 6.3499998"
                          id="svg8"
                          version="1.1"
                        >
                          <defs id="defs2" />
                          <path
                            d="m 2.1835938,0.72070302 c -0.4271174,0 -0.8546461,0.16323989 -1.1796876,0.48828128 -0.65008277,0.6500828 -0.65008277,1.707339 0,2.3574219 l 1.984375,1.9843749 a 0.26460976,0.26460976 0 0 0 0.373047,0 L 5.3457031,3.5664062 c 0.6500828,-0.6500829 0.6500828,-1.7073391 0,-2.3574219 C 4.7473328,0.61061415 3.8291869,0.62768703 3.1757812,1.1308593 2.8770626,0.90036497 2.5432669,0.72070302 2.1835938,0.72070302 Z m 0,0.52539068 c 0.2902341,-1e-7 0.5800571,0.1113071 0.8046874,0.3359374 a 0.26460976,0.26460976 0 0 0 0.373047,0 c 0.4492606,-0.4492607 1.1620671,-0.4492608 1.611328,0 0.4492609,0.4492608 0.4492609,1.1620674 0,1.6113282 L 3.1757812,4.9902344 1.3769531,3.1933593 c -0.44926078,-0.4492608 -0.44926078,-1.1620674 0,-1.6113282 C 1.6015836,1.3574007 1.8933596,1.2460937 2.1835938,1.2460937 Z"
                            id="rect2507"
                          />
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
                <div className={`mb-8 mt-4 flex w-full`}>
                  <div>
                    {post?.user && (
                      <ProfileImage user={post?.user} width={120} />
                    )}
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
