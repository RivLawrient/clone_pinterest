import Link from "next/link";
import { useState } from "react";
import { ListPost, Post } from "../../(postContext)/Post";
import SaveBtn from "../saveBtn";
import DetailBtn from "../detailBtn";

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
  const [show, setShow] = useState<boolean>(true);
  return (
    <>
      <div
        className="group relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: getSoftColor() }}
        onMouseEnter={() => setShow(false)}
        onMouseLeave={() => setShow(true)}
      >
        <div className={`${show ? "hidden" : ""} absolute right-0 z-[2] m-3`}>
          <SaveBtn post={eachPost} setPost={setPost} />
        </div>

        <Link
          href={`/pin/${eachPost.id}`}
          className={`absolute size-full cursor-pointer duration-200 group-hover:bg-black group-hover:opacity-50`}
        ></Link>
        <img
          style={{ backgroundColor: getSoftColor() }}
          src={eachPost.image ? eachPost.image : ""}
          alt=""
          className="w-full"
        />
      </div>
    </>
  );
}
