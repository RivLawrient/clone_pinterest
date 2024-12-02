import { useState } from "react";
import { Post } from "../../(postContext)/Post";

export function LikeBtn({
  post,
  setPost,
}: {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleLike = async () => {
    setLoading(true);
    try {
      fetch("http://127.0.0.1:4000/like_post/" + post?.id, {
        method: "POST",
        credentials: "include",
      }).then(async (response) => {
        const data = response.json();
        if (response.ok) {
          setPost(
            post
              ? {
                  ...post,
                  like_status: true,
                  total_like: post.total_like ? post.total_like + 1 : 1,
                }
              : null,
          );
        }
      });
    } catch {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleUnlike = () => {
    setLoading(true);
    try {
      fetch("http://127.0.0.1:4000/unlike_post/" + post?.id, {
        method: "DELETE",
        credentials: "include",
      }).then(async (response) => {
        const data = response.json();
        if (response.ok) {
          setPost(
            post
              ? {
                  ...post,
                  like_status: false,
                  total_like: post.total_like ? post.total_like - 1 : null,
                }
              : null,
          );
        }
      });
    } catch {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div
      onClick={() => {
        loading ? null : post?.like_status ? handleUnlike() : handleLike();
      }}
      className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100`}
    >
      {post?.like_status ? <LikedIcon /> : <LikeIcon />}
    </div>
  );
}

function LikedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={24}
      id="vector"
    >
      <path
        id="face"
        d="M 66.72 17.122 L 60 23.897 L 53.28 17.122 C 41.084 4.959 21.305 4.959 9.109 17.122 C -3.036 29.331 -3.036 49.136 9.109 61.345 L 60 111.636 L 110.891 61.345 C 123.036 49.136 123.036 29.331 110.891 17.122 C 104.793 11.041 96.799 8 88.805 8 C 80.811 8 72.818 11.041 66.72 17.122 Z"
        fill="#ff5246"
      />
      <g id="group">
        <path
          id="left_eye"
          d="M 32.727 48.909 C 32.727 53.428 36.391 57.091 40.909 57.091 C 45.428 57.091 49.091 53.428 49.091 48.909 C 49.091 44.391 45.428 40.727 40.909 40.727 C 36.391 40.727 32.727 44.391 32.727 48.909 Z"
          fill="#720906"
        />
        <path
          id="right_eye"
          d="M 70.909 48.909 C 70.909 53.428 74.572 57.091 79.091 57.091 C 83.61 57.091 87.273 53.428 87.273 48.909 C 87.273 44.391 83.61 40.727 79.091 40.727 C 74.572 40.727 70.909 44.391 70.909 48.909 Z"
          fill="#720906"
        />
      </g>
      <path
        id="mouth"
        d="M 60 66.8 C 54.1 66.8 48.6 65.5 43.7 63.1 C 43.9 72 51.1 79.1 60 79.1 C 68.9 79.1 76.2 71.9 76.3 63.1 C 71.4 65.4 65.9 66.8 60 66.8 Z"
        fill="#720906"
      />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.93992 6C6.85992 6 7.76992 6.37 8.42992 7.02L9.90992 8.46L11.9999 10.5L14.0899 8.46L15.5699 7.02C16.2399 6.37 17.1399 6 18.0599 6C18.5499 6 19.2599 6.11 19.9099 6.63C20.5699 7.16 20.9599 7.9 20.9999 8.71C21.0399 9.52 20.7299 10.28 20.1399 10.86L20.0699 10.93L19.9999 11.01C19.9399 11.08 14.4099 17.23 11.9999 19.76C9.58992 17.22 4.05992 11.07 3.99992 11.01L3.93992 10.93L3.85992 10.86C3.26992 10.28 2.96992 9.52 2.99992 8.71C3.03992 7.9 3.42992 7.16 4.08992 6.63C4.72992 6.11 5.44992 6 5.93992 6ZM18.0599 3C16.3999 3 14.7299 3.65 13.4799 4.87C13.1099 5.23 11.9999 6.31 11.9999 6.31C11.9999 6.31 10.8899 5.23 10.5199 4.87C9.26992 3.65 7.59992 3 5.93992 3C4.60992 3 3.28992 3.42 2.20992 4.29C-0.580081 6.54 -0.730081 10.57 1.76992 13.01C1.76992 13.01 8.05992 20.02 10.2499 22.27C10.7199 22.76 11.3599 23 11.9999 23C12.6399 23 13.2799 22.76 13.7499 22.27C15.9399 20.02 22.2299 13.01 22.2299 13.01C24.7299 10.58 24.5799 6.54 21.7899 4.29C20.7099 3.42 19.3899 3 18.0599 3Z"
        fill="#111111"
      />
    </svg>
  );
}
