import { useState } from "react";
import { Post } from "../(postContext)/Post";

export function MoreBtn({ post, size }: { post: Post; size: number }) {
  const [show, setShow] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      const res = await fetch(post.image);
      if (!res.ok) throw new Error("File tidak ditemukan");

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${post.image.split("/").pop()}`;
      link.click();
    } catch (err) {}
  };
  return (
    <div className="flex justify-center">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={`${show && "brightness-90"} flex size-[${size}px] items-center justify-center rounded-full bg-white`}
      >
        <svg
          aria-hidden="true"
          aria-label=""
          height={size == 32 ? 16 : 20}
          role="img"
          viewBox="0 0 24 24"
          width={size == 32 ? 16 : 20}
        >
          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
        </svg>
      </div>

      {/* modal */}
      {show && (
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={`${size == 32 ? "m-7" : "m-11"} absolute z-[3] flex flex-col rounded-2xl border bg-white p-3 duration-200`}
        >
          <div className={`text-nowrap text-[14px]`}>
            This Pin was inspired by your recent activity
          </div>
          <a
            onClick={handleDownload}
            className={`cursor-pointer rounded-lg p-2 text-start text-[16px] font-semibold hover:bg-black/40 active:bg-black/50`}
          >
            Download image
          </a>
        </div>
      )}
    </div>
  );
}
