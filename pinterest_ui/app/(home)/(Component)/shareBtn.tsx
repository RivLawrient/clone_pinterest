import { useNotif } from "@/app/(notifContext)/Notif";
import { useState } from "react";
[];
import { Post } from "../(postContext)/Post";

export function ShareBtn({ post, size }: { post: Post; size: number }) {
  const [show, setShow] = useState<boolean>(false);
  const { setMsg, triggerNotif } = useNotif();

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
          <path d="M7.44 5.44a1.5 1.5 0 1 0 2.12 2.12l.94-.94v6.88a1.5 1.5 0 0 0 3 0V6.62l.94.94a1.5 1.5 0 0 0 2.12-2.12l-3.5-3.5a1.5 1.5 0 0 0-2.12 0zM5 13.5a1.5 1.5 0 0 0-3 0v5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-5a1.5 1.5 0 0 0-3 0v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z"></path>
        </svg>
      </div>

      {/* modal */}
      {show && (
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={`absolute z-[3] m-6 flex min-w-[150px] flex-col items-center rounded-2xl border bg-white p-3 duration-200`}
        >
          <div className={`mb-3 text-[14px] font-semibold`}>Share</div>
          <div className={`flex flex-col items-center`}>
            <div
              onClick={() =>
                navigator.clipboard
                  .writeText(`${window.location.href}/pin/${post.id}`)
                  .finally(() => {
                    setMsg("Link Coppied");
                    triggerNotif();
                  })
              }
              className={`flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-[#e9e9e9] hover:brightness-90 active:brightness-75`}
            >
              <svg
                aria-hidden="true"
                aria-label=""
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="m21 7.24-4.05 4.05-1.06-1.06.67-.67a1.5 1.5 0 1 0-2.12-2.12l-.67.67-1.06-1.06L16.76 3zm-9.7 9.7L7.23 21 3 16.76l4.05-4.05 1.06 1.06-.67.67a1.5 1.5 0 0 0 2.12 2.12l.67-.67zM14.63.89l-4.05 4.05a3 3 0 0 0 0 4.24l1.06 1.06-1.42 1.42-1.06-1.06a3 3 0 0 0-4.24 0L.88 14.64a3 3 0 0 0 0 4.24l4.24 4.24a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24l-1.06-1.06 1.42-1.42 1.06 1.06a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24L18.88.88a3 3 0 0 0-4.24 0"></path>
              </svg>
            </div>
            <div className={`text-[12px]`}>Copy Link</div>
          </div>
        </div>
      )}
    </div>
  );
}
