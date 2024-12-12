import React, { useRef } from "react";
import { Post } from "../../(postContext)/Post";
import SaveBtn from "../../(Component)/saveBtn";

export default function ShowDetail({
  showDetail,
  setShowDetail,
  post,
  setPost,
}: {
  showDetail: boolean;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  if (!showDetail || !post) return null;
  return (
    <div
      // ref={ref}
      // onClick={(e: React.MouseEvent<HTMLDivElement>) =>
      //   e.target === ref.current ? setDetail(false) : null
      // }
      className="fixed top-0 z-50 flex h-screen w-screen justify-between bg-black bg-opacity-85 backdrop-blur-sm"
    >
      <div
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          e.target === ref.current ? setShowDetail(false) : null
        }
        className="relative flex h-screen w-screen items-center justify-center"
      >
        <div className="absolute top-0 flex w-screen justify-between">
          <div
            onClick={() => {
              setShowDetail(false);
            }}
            className="m-4 flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-white p-4"
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

          <div className={`m-4`}>
            {post && (
              <SaveBtn
                setPost={setPost as React.Dispatch<React.SetStateAction<Post>>}
                post={post}
              />
            )}
          </div>
        </div>
        <img
          src={post.image}
          alt=""
          className={`h-auto max-h-screen min-h-screen rounded-[32px] object-fill`}
        />
      </div>
    </div>
  );
}
