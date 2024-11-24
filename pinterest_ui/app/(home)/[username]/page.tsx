"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Masonry from "../(Masonry)/masonry";
import { Post, User } from "../(postContext)/Post";
import ProfileImg from "../(Header)/profileImg";
import { useUser } from "@/app/(userContext)/User";

export default function UsernamePage() {
  const [post, setPost] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User | null>(null);
  const [tab, setTab] = useState<"created" | "saved">("created");
  const { user } = useUser();
  const path = usePathname();

  console.log();

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/user/${path.slice(1)}`, {
      method: "GET",
      credentials: "include",
    }).then(async (respons) => {
      const data = await respons.json();
      if (respons.ok) {
        setPost(data.data.post);
        setUsers(data.data);
      }
    });
  }, [users]);
  return (
    <>
      <div className="mt-20 flex w-screen flex-col items-center justify-center">
        {users && (
          <>
            {users?.profile_img ? (
              <img
                src={user?.profile_img}
                alt=""
                width="120"
                className="rounded-full"
              />
            ) : (
              <ProfileImg alp={users?.username} width={120} />
            )}
            <div className="text-[36px]">
              {users?.first_name} {users?.last_name}
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
              {users?.username}
            </div>

            <div className="text-[16px]">62 followers · 0 following</div>

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
                <div className="cursor-pointer rounded-full bg-[#E60023] px-4 py-3 text-white hover:bg-[#c9001e]">
                  Follow
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {users && (
        <>
          <div className="mt-8 flex w-screen items-center justify-center gap-4 text-[16px] font-semibold">
            <div
              onClick={() => setTab("created")}
              className={`${tab == "created" ? "ml-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:scale-90 active:bg-[#e1e1e1]"} cursor-pointer py-2`}
            >
              Created
            </div>
            <div
              onClick={() => setTab("saved")}
              className={`${tab == "saved" ? "mr-3 border-b-4 border-black" : "mb-1 rounded-lg px-3 hover:bg-[#F1F1F1] active:scale-90 active:bg-[#e1e1e1]"} cursor-pointer py-2`}
            >
              Saved
            </div>
          </div>
          {tab == "created" ? (
            <div className="mt-5 flex w-screen justify-center">
              {post ? <Masonry post={post} /> : <div>gada post coy</div>}
            </div>
          ) : (
            <div>saved</div>
          )}
        </>
      )}
    </>
  );
}