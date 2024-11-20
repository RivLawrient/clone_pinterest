"use client";

import { useState } from "react";

export default function Create() {
  const [image, seImage] = useState<string>("");
  return (
    <div className="mt-[80px]">
      <input
        type="file"
        accept="image/jpg"
        onChange={async (e) => {
          const file = new FormData();
          file.append("image", e.target.files ? e.target.files[0] : "");
          const api = await fetch(`http://127.0.0.1:4000/img`, {
            method: "post",
            body: file,
          }).then(async (response) => {
            const data = await response.json();
            console.log(data);
            if (response.ok) {
              seImage(data.link);
            }
          });
        }}
        className="none size-[200px] bg-black pt-5 text-white"
      />
      <button className="size-10 bg-red-300"></button>
      {image != "" ? <img src={image} alt="" /> : null}
    </div>
  );
}
