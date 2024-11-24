"use client";

import { useState } from "react";

function Image({
  image,
  setImage,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [image, seImage] = useState<string>("");
  return (
    <>
      {image != "" ? (
        <img src={image} alt="" className="w-[342px] rounded-[32px]" />
      ) : (
        <div className="relative h-[453px] w-[375px]">
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

                if (response.ok) {
                  setImage(data.link);
                }
              });
            }}
            className="absolute size-full cursor-pointer rounded-[32px] bg-black opacity-0"
          />
          <div className="relative z-[-1] flex size-full flex-col items-center justify-center rounded-[32px] border-[2px] border-dashed border-[#b3b3b3] bg-[#DADADA]">
            <div className="flex justify-center py-2">
              <svg
                aria-label="Add files"
                height="32"
                role="img"
                viewBox="0 0 24 24"
                width="32"
              >
                <path d="M24 12a12 12 0 1 0-24 0 12 12 0 0 0 24 0m-10.77 3.75a1.25 1.25 0 0 1-2.5 0V11.8L9.7 12.83a1.25 1.25 0 0 1-1.77-1.77L12 7l4.07 4.06a1.25 1.25 0 0 1-1.77 1.77l-1.07-1.06z"></path>
              </svg>
            </div>
            <div className="flex max-w-[220px] justify-center">
              <span className="text-center text-[16px] leading-tight">
                Choose a file or drag and drop it here
              </span>
            </div>
            <div className="absolute bottom-0 flex justify-center px-6 py-8">
              <span className="text-center text-[14px] leading-tight">
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Create() {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  return (
    <div className="mt-[80px] flex w-screen flex-col items-center justify-center">
      <div className="flex h-[80px] w-full items-center justify-between border-b border-[#cdcdcd] px-7">
        <span className="text-[20px] font-semibold">Create pin</span>
        <div
          hidden={!image}
          onClick={() => {
            fetch("http://127.0.0.1:4000/post", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                title: title,
                descripion: desc,
                image: image,
              }),
            }).then(async (response) => {
              if (response.ok) {
                setImage("");
                setTitle("");
                setDesc("");
              }
            });
          }}
          className="cursor-pointer select-none rounded-full bg-[#e60023] px-4 py-3 text-[16px] text-white hover:bg-[#c9001e] active:scale-90"
        >
          Publish
        </div>
      </div>

      <div className="my-6 flex flex-col gap-10 lg:flex-row">
        <div>
          <Image image={image} setImage={setImage} />
        </div>
        <div className="relative flex w-[584px] flex-col">
          <div
            hidden={image != ""}
            className="absolute size-full bg-white opacity-70"
          ></div>
          <div className="mb-6 flex flex-col">
            <div className="pb-2 text-[12px]">Title</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Add a title"
              className="truncate rounded-2xl border border-[#cdcdcd] px-4 py-3"
            />
          </div>
          <div className="flex flex-col">
            <div className="pb-2 text-[12px]">Description</div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add a detailed description"
              maxLength={300}
              className="h-[164px] resize-none rounded-2xl border border-[#cdcdcd] px-4 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
