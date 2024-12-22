"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ListPost, Post, User } from "../(postContext)/Post";
import { useUser } from "@/app/(userContext)/User";
import ProfileImage from "../(Component)/profileImage";
import Masonry from "../(Component)/(Masonry)/masonry";

export default function UsernamePage() {
  const [post, setPost] = useState<ListPost[]>([]);
  const [save, setSave] = useState<ListPost[]>([]);
  const [users, setUsers] = useState<User | null>(null);

  const [tab, setTab] = useState<"created" | "saved">("created");
  const [isloading, setIsloading] = useState<boolean>(true);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(true);
  const { user } = useUser();
  const path = usePathname();
  const [followBtn, setFollowBtn] = useState<boolean>(false);

  useEffect(() => {
    setIsloading(true);
    fetch(`${process.env.HOST_API_PUBLIC}/user/${path.slice(1)}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          setUsers(data.data);
        }
      })
      .catch(() => console.log("err"))
      .finally(() => setIsloading(false));
    fetch(`${process.env.HOST_API_PUBLIC}/posts/${path.slice(1)}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          setPost(data.data.posted);
          setSave(data.data.saved);
        }
      })
      .finally(() => setIsLoadingPost(false))
      .catch(() => console.log())
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const FollowHandle = async () => {
    try {
      setFollowBtn(true);
      await fetch(`${process.env.HOST_API_PUBLIC}/follow/${path.slice(1)}`, {
        method: "POST",
        credentials: "include",
      }).then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          setUsers((prevUsers) => {
            if (!prevUsers) return null; // Handle the case where there are no previous users
            return {
              ...prevUsers,
              follow: {
                follower_count: prevUsers.follow?.follower_count ?? null, // Ensure a default value
                following_count: prevUsers.follow?.following_count ?? null, // Ensure a default value
                follow_status: true, // Update the follow_status
              },
            };
          });
        } else {
          return new Error(data.errors);
        }
      });
    } catch (err) {
    } finally {
      setFollowBtn(false);
    }
  };

  const UnFollowHandle = async () => {
    try {
      setFollowBtn(true);
      await fetch(`${process.env.HOST_API_PUBLIC}/unfollow/${path.slice(1)}`, {
        method: "DELETE",
        credentials: "include",
      }).then(async (respons) => {
        const data = await respons.json();
        if (respons.ok) {
          setUsers((prevUsers) => {
            if (!prevUsers) return null; // Handle the case where there are no previous users
            return {
              ...prevUsers,
              follow: {
                follower_count: prevUsers.follow?.follower_count ?? null, // Ensure a default value
                following_count: prevUsers.follow?.following_count ?? null, // Ensure a default value
                follow_status: false, // Update the follow_status
              },
            };
          });
        } else {
          return new Error(data.errors);
        }
      });
    } catch (err) {
    } finally {
      setFollowBtn(false);
    }
  };
  return (
    <>
      <div className="flex w-screen select-none flex-col items-center justify-center overflow-clip pt-[px] md:pt-20">
        {isloading ? (
          <>
            <div>loading...</div>
          </>
        ) : (
          <>
            {users && user && (
              <>
                <ProfileImage user={users} width={120} />

                <div className="text-[36px]">
                  {users.first_name} {users.last_name}
                </div>
                <div className="flex items-center gap-1 text-[14px] text-[#767676]">
                  <svg
                    aria-label="pinterest"
                    className="fill-[#767676]"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
                  </svg>
                  {users.username}
                </div>

                <div className="text-[16px]">
                  {users.follow?.follower_count} followers ·{" "}
                  {users.follow?.following_count} following
                </div>

                {users.username == user?.username ? (
                  <div className="mt-2 flex gap-1 text-[16px]">
                    <div className="cursor-pointer rounded-full bg-[#f1f1f1] px-4 py-3 hover:bg-[#E1E1E1]">
                      Share
                    </div>
                    <div className="cursor-pointer rounded-full bg-[#f1f1f1] px-4 py-3 hover:bg-[#E1E1E1]">
                      Edit profile
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-1 text-[16px]">
                    <div className="cursor-pointer rounded-full bg-[#f1f1f1] px-4 py-3 hover:bg-[#E1E1E1]">
                      Message
                    </div>

                    {users.follow?.follow_status ? (
                      <div
                        onClick={() => {
                          if (!followBtn) {
                            UnFollowHandle();
                          }
                        }}
                        className={`${followBtn ? "opacity-50" : "cursor-pointer"} rounded-full bg-black px-4 py-3 text-white`}
                      >
                        Following
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          if (!followBtn) {
                            FollowHandle();
                          }
                        }}
                        className={`${followBtn ? "opacity-50" : "cursor-pointer"} rounded-full bg-[#E60023] px-4 py-3 text-white hover:bg-[#c9001e]`}
                      >
                        Follow
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {users && (
              <div>
                <div className="mt-8 flex w-screen items-center justify-center gap-4 text-[16px] font-semibold">
                  <div
                    onClick={() => setTab("created")}
                    className={`${tab == "created" ? "ml-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:bg-[#e1e1e1]"} cursor-pointer py-2`}
                  >
                    Created
                  </div>
                  <div
                    onClick={() => setTab("saved")}
                    className={`${tab == "saved" ? "mr-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:bg-[#e1e1e1]"} cursor-pointer py-2`}
                  >
                    Saved
                  </div>
                </div>
                {isLoadingPost ? (
                  <div>LOADING...</div>
                ) : tab == "created" ? (
                  <div className="mt-5 flex w-screen justify-center">
                    {post && post.length > 0 ? (
                      <Masonry post={post} setPost={setPost} />
                    ) : (
                      <div className="text-[16px]">
                        No Pins yet, but there's tons of potential
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-5 flex w-screen justify-center">
                    {save && save.length > 0 ? (
                      <Masonry post={save} setPost={setSave} />
                    ) : (
                      <div className="text-[16px]">
                        someone d hasn't saved any Pins yet
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* {isloading ? (
        <div>LOADING...</div>
      ) : (
        users && (
          <div>
            <div className="mt-8 flex w-screen items-center justify-center gap-4 text-[16px] font-semibold">
              <div
                onClick={() => setTab("created")}
                className={`${tab == "created" ? "ml-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:bg-[#e1e1e1]"} cursor-pointer py-2`}
              >
                Created
              </div>
              <div
                onClick={() => setTab("saved")}
                className={`${tab == "saved" ? "mr-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:bg-[#e1e1e1]"} cursor-pointer py-2`}
              >
                Saved
              </div>
            </div>
            {tab == "created" ? (
              <div className="mt-5 flex w-screen justify-center">
                {post && post.length > 0 ? (
                  <Masonry post={post} setPost={setPost} />
                ) : (
                  <div className="text-[16px]">
                    No Pins yet, but there's tons of potential
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5 flex w-screen justify-center">
                {save && save.length > 0 ? (
                  <Masonry post={save} setPost={setSave} />
                ) : (
                  <div className="text-[16px]">
                    someone d hasn't saved any Pins yet
                  </div>
                )}
              </div>
            )}
          </div>
        )
      )} */}
    </>
  );
}
