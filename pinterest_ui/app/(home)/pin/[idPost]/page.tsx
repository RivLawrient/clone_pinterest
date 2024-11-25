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
                maxWidth: `calc(100vw - 350px)`,
                maxHeight: `calc(100vh - 150px)`,
              }}
              className="flex h-full w-full flex-col overflow-hidden rounded-[32px] border bg-white lg:flex-row"
            >
              <div className="basis-1/2 bg-slate-50">
                <img
                  src={post?.image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
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
