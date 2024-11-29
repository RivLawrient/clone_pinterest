import React, { useEffect, useRef, useState } from "react";
import MasonryItem from "./masonryItem";
import { Post, usePost } from "../(postContext)/Post";

export default function Masonry({
  post,
  setPost,
}: {
  post: Post[];
  setPost: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const [leng, setLeng] = useState(0);
  const result = Array.from({ length: leng }, (_, i) =>
    post?.filter((_, index) => index % leng === i),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (ref.current) {
        setLeng(Math.max(2, Math.floor(ref.current.clientWidth / 253)));
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="flex w-screen justify-center">
        <div className="flex flex-row gap-4">
          {result.map((value, index) => (
            <div
              key={index}
              className="flex flex-col gap-4"
              style={{
                width: `${238}px`,
              }}
            >
              {value?.map((val, ind) => (
                <MasonryItem
                  eachPost={val}
                  post={post}
                  setPost={setPost}
                  key={ind}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
