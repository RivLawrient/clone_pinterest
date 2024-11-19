import { useState } from "react";

export default function MasonryItem({ src }: { src: string }) {
  const getSoftColor = () => {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    return `rgb(${r}, ${g}, ${b})`;
  };
  const [show, setShow] = useState<boolean>(true);
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{ backgroundColor: getSoftColor() }}
      onMouseEnter={() => setShow(false)}
      onMouseLeave={() => setShow(true)}
    >
      <div
        hidden={show}
        onClick={() => {
          console.log(src);
        }}
        className="absolute right-0 z-[2] m-3 select-none rounded-full bg-red-700 p-4 text-[16px] leading-none tracking-wide text-white transition-all hover:bg-red-800 active:scale-90"
      >
        Save
      </div>

      {/* <div
        hidden={show}
        onClick={() => {
          console.log(src);
        }}
        className="absolute right-0 z-[2] m-3 select-none rounded-full bg-black p-4 text-[16px] leading-none tracking-wide text-white transition-all active:scale-90"
      >
        Saved
      </div> */}
      <div
        className={`absolute bottom-0 right-0 flex gap-2 p-4 ${
          show ? "hidden" : ""
        }`}
      >
        <div className="z-[2] flex size-[32px] select-none items-center justify-center rounded-full bg-white transition-all hover:bg-[#d6d6d6] active:scale-90">
          <svg
            aria-hidden="true"
            aria-label=""
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
            className="fill-black"
          >
            <path d="M7.44 5.44a1.5 1.5 0 1 0 2.12 2.12l.94-.94v6.88a1.5 1.5 0 0 0 3 0V6.62l.94.94a1.5 1.5 0 0 0 2.12-2.12l-3.5-3.5a1.5 1.5 0 0 0-2.12 0zM5 13.5a1.5 1.5 0 0 0-3 0v5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-5a1.5 1.5 0 0 0-3 0v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z"></path>
          </svg>
        </div>

        <div className="z-[2] flex size-[32px] select-none items-center justify-center rounded-full bg-white transition-all hover:bg-[#d6d6d6] active:scale-90">
          <svg
            aria-hidden="true"
            aria-label=""
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
            className="fill-black"
          >
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
          </svg>
        </div>
      </div>
      <div
        className={`absolute size-full duration-200 group-hover:bg-black group-hover:opacity-50`}
      ></div>
      <img
        style={{ backgroundColor: getSoftColor() }}
        src={src ? src : ""}
        alt=""
        className="w-full"
      />
    </div>
  );
}
