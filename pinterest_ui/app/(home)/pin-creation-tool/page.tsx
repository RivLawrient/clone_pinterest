"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { BackBtn } from "../pin/[idPost]/backBtn";
import { useNotif } from "@/app/(notifContext)/Notif";

export default function Create() {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);
  const { setIsError, setMsg, triggerNotif } = useNotif();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Mobile
        image={image}
        setImage={setImage}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        publishing={publishing}
        setPublishing={setPublishing}
        setIsError={setIsError}
        setMsg={setMsg}
        triggerNotif={triggerNotif}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <div className="mt-[80px] hidden w-screen flex-col items-center justify-center md:flex">
        <div className="flex h-[80px] w-full items-center justify-between border-b border-[#cdcdcd] px-7">
          <span className="text-[20px] font-semibold">Create pin</span>
          {image ? (
            publishing ? (
              <div className="select-none rounded-full bg-[#e60023] px-4 py-3 text-[16px] text-white opacity-20">
                Publishing...
              </div>
            ) : (
              <div
                onClick={async () => {
                  setPublishing(true);
                  await fetch(`${process.env.HOST_API_PUBLIC}/post`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      title: title,
                      description: desc,
                      image: image,
                    }),
                  })
                    .then(async (response) => {
                      if (response.ok) {
                        setImage("");
                        setTitle("");
                        setDesc("");
                        setPublishing(false);
                        setMsg("Your pin has been published");
                        setIsError(false);
                        triggerNotif();
                      } else {
                        setMsg("Failed to publish. Please try again.");
                        setIsError(true);
                        triggerNotif();
                      }
                    })
                    .catch(() => {
                      setMsg("Failed to publish. Please try again.");
                      setIsError(true);
                      triggerNotif();
                    });
                }}
                className={`cursor-pointer select-none rounded-full bg-[#e60023] px-4 py-3 text-[16px] text-white hover:bg-[#c9001e] active:scale-90`}
              >
                Publish
              </div>
            )
          ) : null}
        </div>

        <div className="my-6 flex flex-col gap-10 lg:flex-row">
          <div>
            <Image
              image={image}
              setImage={setImage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
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
                maxLength={100}
                className="h-[164px] resize-none rounded-2xl border border-[#cdcdcd] px-4 py-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Image({
  image,
  setImage,
  isLoading,
  setIsLoading,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsError, setMsg, triggerNotif } = useNotif();

  return (
    <>
      {image != "" ? (
        <img
          src={image}
          alt=""
          className="max-h-[365px] max-w-[400px] rounded-[32px] object-cover md:max-h-[600px] md:min-w-[323px] md:max-w-[420px]"
        />
      ) : (
        <div
          className={`relative h-[365px] w-[268px] lg:h-[453px] lg:w-[375px]`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = new FormData();
              file.append("image", e.target.files ? e.target.files[0] : "");
              setLoading(true);
              const api = await fetch(`${process.env.HOST_API_PUBLIC}/img`, {
                method: "post",
                body: file,
              })
                .then(async (response) => {
                  const data = await response.json();

                  if (response.ok) {
                    setImage(data.link);
                  } else {
                    setMsg("Failed to publish. Please try again.");
                    setIsError(true);
                    triggerNotif();
                  }
                })
                .catch(() => {
                  setMsg("Failed to publish. Please try again.");
                  setIsError(true);
                  triggerNotif();
                })
                .finally(() => setLoading(false));
            }}
            className={`${loading ? "cursor-wait" : "cursor-pointer"} absolute size-full rounded-[32px] bg-black opacity-0`}
          />
          <div
            className={`relative z-[-1] flex size-full flex-col items-center justify-center rounded-[32px] border-[2px] border-dashed border-[#b3b3b3] bg-[#DADADA]`}
          >
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
                {loading
                  ? "LOADING..."
                  : " Choose a file or drag and drop it here"}
              </span>
            </div>
            {/* <div className="absolute bottom-0 flex justify-center px-6 py-8">
              <span className="text-center text-[14px] leading-tight">
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </span>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

function Mobile({
  image,
  setImage,
  title,
  setTitle,
  desc,
  setDesc,
  publishing,
  setPublishing,
  setIsError,
  setMsg,
  triggerNotif,
  isLoading,
  setIsLoading,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  publishing: boolean;
  setPublishing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: (value: boolean) => void;
  setMsg: (value: string) => void;
  triggerNotif: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {image && (
        <div
          className={`pointer-events-none fixed bottom-0 z-[11] my-2 flex w-full justify-center bg-transparent md:hidden`}
        >
          <div
            onClick={async () => {
              setPublishing(true);
              await fetch(`${process.env.HOST_API_PUBLIC}/post`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  title: title,
                  description: desc,
                  image: image,
                }),
              })
                .then(async (response) => {
                  if (response.ok) {
                    setImage("");
                    setTitle("");
                    setDesc("");
                    setPublishing(false);
                    setMsg("Your pin has been published");
                    setIsError(false);
                    triggerNotif();
                  } else {
                    setMsg("Failed to publish. Please try again.");
                    setIsError(true);
                    triggerNotif();
                  }
                })
                .catch(() => {
                  setMsg("Failed to publish. Please try again.");
                  setIsError(true);
                  triggerNotif();
                });
            }}
            className={`${publishing ? "pointer-events-none bg-[#fb6e83]" : "pointer-events-auto bg-[#e60023]"} select-none rounded-full px-4 py-3 text-[16px] text-white hover:bg-[#c9001e] active:scale-90`}
          >
            {publishing ? <>Publishing</> : <>Publish</>}
          </div>
        </div>
      )}

      <div
        className={`fixed flex h-screen w-screen flex-col items-center bg-white pb-16 md:hidden`}
      >
        <BackBtn />
        <div className={`flex h-[60px] items-center font-semibold`}>
          Create Pin
        </div>
        <Image
          image={image}
          setImage={setImage}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <div className="relative mt-[20px] flex w-[400px] flex-col">
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
              maxLength={100}
              className="h-[130px] resize-none rounded-2xl border border-[#cdcdcd] px-4 py-3 md:h-[164px]"
            />
          </div>
        </div>

        {/* <div
        className={`w-fit select-none rounded-full bg-[#e60023] px-4 py-3 text-[16px] text-white opacity-20`}
      >
        {image ? (
          publishing ? (
            <div className="">Publishing...</div>
          ) : (
            <div
              
              className={``}
            >
              Publish
            </div>
          )
        ) : null}
      </div> */}
      </div>
    </>
  );
}
