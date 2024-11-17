import { useState } from "react";

export default function MasonryItem({ src }: { src: string }) {
  const getSoftColor = () => {
    const r = Math.floor(Math.random() * 56) + 200; // Red (200-255)
    const g = Math.floor(Math.random() * 56) + 200; // Green (200-255)
    const b = Math.floor(Math.random() * 56) + 200; // Blue (200-255)
    return `rgb(${r}, ${g}, ${b})`; // Hasilkan warna soft
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
        className="absolute right-0 z-[2] m-3 rounded-full bg-red-700 p-4 text-[16px] leading-none text-white hover:bg-red-800"
      >
        Save
      </div>
      <div
        className={`absolute size-full duration-200 group-hover:bg-black group-hover:opacity-50`}
      ></div>
      <img src={src ? src : ""} alt="" />
    </div>
  );
}
