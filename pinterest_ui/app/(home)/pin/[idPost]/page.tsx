"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "../../(postContext)/Post";
import Link from "next/link";
import ProfileImg from "../../(Header)/profileImg";
import { useUser } from "@/app/(userContext)/User";

export default function PagePost() {
  const { user } = useUser();
  const path = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [view, setView] = useState<boolean>(false);

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
  }, []);
  return (
    <div className="mt-20 flex w-screen flex-col items-center">
      {isloading ? (
        <div>Loading...</div>
      ) : (
        post && (
          <>
            <div
              style={{
                maxWidth: `calc(100vw - 400px)`,
                maxHeight: `calc(100vh - 150px)`,
              }}
              className="flex h-full w-full flex-col overflow-hidden rounded-[32px] border bg-white lg:flex-row"
            >
              <div className="relative min-w-[35%] max-w-[50%] bg-slate-50">
                <div
                  onMouseEnter={() => setView(true)}
                  onMouseLeave={() => setView(false)}
                  className="absolute bottom-0 right-0 z-[2] m-6 flex cursor-pointer items-center rounded-full bg-white text-[16px] font-bold"
                >
                  {/* <span hidden={!view} className="m-[14px] mr-0">
                    View larger
                  </span> */}
                  <svg
                    aria-label="closeup image action button"
                    className="m-[14px] fill-black"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M9.75 1a1.25 1.25 0 0 1 0 2.5H5.27l5.36 5.37a1.25 1.25 0 0 1-1.76 1.76L3.5 5.27v4.48a1.25 1.25 0 0 1-2.5 0V1zM20.5 14.25a1.25 1.25 0 0 1 2.5 0V23h-8.75a1.25 1.25 0 0 1 0-2.5h4.48l-5.36-5.37a1.25 1.25 0 0 1 1.76-1.76l5.37 5.36z"></path>
                  </svg>
                </div>
                <img
                  src={post?.image}
                  alt=""
                  className="max-h-full object-cover"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <div className="flex basis-1/2">
                <Link
                  href={`/${post.user.username}`}
                  className="flex h-fit gap-2 p-2"
                >
                  {user?.profile_img ? (
                    <img
                      src={user.profile_img}
                      alt=""
                      width="24"
                      className="rounded-full"
                    />
                  ) : (
                    <ProfileImg alp={user?.username} width={24} />
                  )}
                  {post.user.username}
                </Link>
              </div>
            </div>
            {/* <div>content</div> */}
          </>
        )
      )}
      {}
    </div>
  );
}
