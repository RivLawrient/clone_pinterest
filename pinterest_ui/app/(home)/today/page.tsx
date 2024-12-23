"use client";
import { useState } from "react";

export default function Today() {
  const [t, setT] = useState<string>("");
  return (
    <div className="h-screen w-screen items-center justify-center md:mt-20">
      {/* <div className="flex w-[200px] flex-row text-wrap bg-red-200">
        <div className="size-[24px] bg-black"></div>
        <div className="flex flex-col">
          <p className="whitespace-normal text-balance break-words">
            SANDIN= {t}
          </p>
        </div>
      </div>
      <input
        onChange={(e) => setT(e.target.value)}
        type="text"
        className="bg-black"
      /> */}
      <div className="grid max-w-[200px] grid-cols-[fit-content(24px)_1fr] bg-pink-500">
        <div className="size-[32px] rounded-full bg-white"></div>
        <span className="break-all">
          akuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuakuaku
        </span>
      </div>
      {/* <div className="grid max-w-[200px] grid-cols-[fit-content(20px)_1fr] gap-4">
        <div className="bg-green-500 p-4">Kolom Sisa</div>
        <div className="break-words bg-red-500 p-4">
          Kolomalsdfkjalkdfjlajflkajlkajflkajlfasdfasdfass
        </div>
      </div> */}
    </div>
  );
}
