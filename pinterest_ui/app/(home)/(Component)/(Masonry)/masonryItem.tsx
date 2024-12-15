import Link from "next/link";
import { useState } from "react";
import { ListPost, Post } from "../../(postContext)/Post";
import SaveBtn from "../saveBtn";
import DetailBtn from "../detailBtn";
import { usePathname } from "next/navigation";
import { useNotif } from "@/app/(notifContext)/Notif";
import { ShareBtn } from "../shareBtn";
import { MoreBtn } from "../moreBtn";

export default function MasonryItem({
  eachPost,
  post,
  setPost,
}: {
  eachPost: ListPost;
  post: ListPost[];
  setPost: React.Dispatch<React.SetStateAction<ListPost[]>>;
}) {
  const getSoftColor = () => {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <div className={`group relative`}>
        <div
          className={`group absolute right-0 z-[2] m-3 hidden group-hover:block`}
        >
          <SaveBtn post={eachPost} setPost={setPost} />
        </div>

        <div
          className={`absolute bottom-0 right-0 z-[2] m-3 hidden flex-row gap-2 group-hover:flex`}
        >
          <ShareBtn post={eachPost as Post} size={32} />
          <MoreBtn post={eachPost as Post} size={32} isMe={false} />
        </div>
        <Link href={`/pin/${eachPost.id}`}>
          <img
            src={eachPost.image}
            alt=""
            className={`rounded-2xl bg-black duration-200 group-hover:brightness-50`}
          />
        </Link>
      </div>
    </>
  );
}
