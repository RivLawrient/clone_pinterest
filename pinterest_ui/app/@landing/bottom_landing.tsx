"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SingIn from "./(modal)/signin";
import SignUp from "./(modal)/signup";
import { useModal } from "./(modalContext)/Modal";
import Modal from "./(modal)/modal";
import Form from "./(modal)/form";

export default function BottomLanding() {
  const { show, setShow } = useModal();
  const [pass, setPass] = useState<string>("password");
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const link = "/img/";
  const images: string[] = [
    `${link}e3414b2fcf00375a199ba6964be551af.jpg`,
    `${link}786e00eab219eca59803d118fbe0feb3.jpg`,
    `${link}3b42b02bf047097582b26401df90cdb3.jpg`,
    `${link}de136b0fa0037d3453a430895d8a5c27.jpg`,
    `${link}15bf41a80a0ffb41cc9d0fd98abed34b.jpg`,
    `${link}c457bd9496170bfa3845b7cee775df65.jpg`,
    `${link}05652045e57af33599557db9f23188c0.jpg`,
    `${link}c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg`,
    `${link}9443b93bd8773fec91bc1837e8424e8e.jpg`,
    `${link}e68a42c2e530fbdf6b3ab2f379dcd384.jpg`,
    `${link}95f373590dad79bcf3202ce6edad5bcd.jpg`,
    `${link}e7c6c65c6e38f43d4b979d3cb1e46bf7.jpg`,
    `${link}fb18deb4959e9a0678e1bf99105ea775.jpg`,
    `${link}c561c2a77d5b9b03702efc423b18cb9a.jpg`,
    `${link}64cf2184d33446c4cf1cc8c3c585b9f4.jpg`,
    `${link}06e814c8c5c82b9bf794add896616e12.jpg`,
    `${link}62bb9727b2e09751d43c32589c503b39.jpg`,
    `${link}a9f90926afdfbff79f6d2a017c8e19dd.jpg`,
    `${link}962cce1d513d665ecca6eb733a90a160.jpg`,
    `${link}af609e357a691876ac58d02e27af316e.jpg`,
    `${link}d55f97078c0d7b60b758cac3b34114c9.jpg`,
    `${link}2245e261944f1eae080423f6ff7805e1--romantic-picnics-romantic-ideas.jpg`,
    `${link}65dfcdd2fc433d45baedb3666cacfd82.jpg`,
    `${link}2877f4e254c0bd27ac4f4c5d8a43404f.jpg`,
    `${link}8b21b0133442afd03d2c5e9a998c96b3.jpg`,
    `${link}489cd9ae5fec17977c73677866202d59.jpg`,
    `${link}14730af41a58e05384b86b0bacf9d57b.jpg`,
    `${link}1636dd650e6289cd0ec4f4f06dea7835--british-recipes-the-great-british-bake-off-recipes.jpg`,
    `${link}dafe1e26613892b2bc26508b33de353d.jpg`,
    `${link}f39c11819b48bf4dc34fa1670fb1fef6.jpg`,
    `${link}d432cdc35cf6cc5c7ec07a5036a87bca.jpg`,
    `${link}c1d07f45a5c2b121255ba9ec54b9adf7.jpg`,
    `${link}18dcf759aa96740f8d335dc6231a9cf9.jpg`,
    `${link}633ec1128e0b7ed911c462cb89620c64.jpg`,
    `${link}4fdf820192314371138c0f4f999cdddc.jpg`,
  ];

  const text = [
    "Terms of Service",
    "Privacy Policy",
    "Help",
    "Iphone App",
    "Android App",
    "Users",
    "Collections",
    "Shopping",
    "Today",
    "Explore",
    "Watch",
    "Shop",
  ];
  const route = useRouter();
  return (
    <div className="relative h-screen w-screen snap-center overflow-hidden">
      <div className="absolute -z-[1] flex w-full justify-center">
        <div className="grid h-fit w-fit grid-flow-col grid-rows-5 gap-3">
          {images.map((value: string, index: number) => (
            <div
              key={index}
              className={`min-w-[236px] max-w-[236px] ${
                (index >= 5 && index <= 9) || (index >= 25 && index <= 29)
                  ? "mt-[-160px]"
                  : (index >= 10 && index <= 14) || (index >= 20 && index <= 24)
                    ? "mt-[-240px]"
                    : index >= 15 && index <= 19
                      ? "mt-[-400px]"
                      : ""
              }`}
            >
              <img
                src={value}
                alt=""
                className="size-full h-[350px] rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex h-screen w-screen flex-row bg-black bg-opacity-60">
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[450px] font-roboto1 text-[70px] font-semibold leading-tight text-white">
            Sign up to get your ideas
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          {!show && (
            <Form
              isSignin={isSignin}
              setIsSignin={setIsSignin}
              setOpen={setShow}
            />
          )}
        </div>
      </div>

      <div className="absolute top-[85px] flex w-full justify-center">
        <div
          onClick={() =>
            document
              .querySelector(".home-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className={`z-20 mb-[16px] flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-[#940343]`}
        >
          <svg
            aria-label="Scroll down"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            className="rotate-180 fill-white"
          >
            <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 flex h-[5vh] w-screen flex-row items-center justify-center bg-white">
        {text.map((value: string, index: number) => (
          <div
            key={index}
            className="roboto2 mr-2 text-nowrap text-[12px] font-semibold hover:underline"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
