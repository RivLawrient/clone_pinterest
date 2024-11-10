"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SingIn from "./(modal)/signin";

export default function BottomLanding() {
  const [pass, setPass] = useState<string>("password");
  const [open, setOpen] = useState<boolean>(true);
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const images: string[] = [
    "https://i.pinimg.com/236x/e3/41/4b/e3414b2fcf00375a199ba6964be551af.jpg",
    "https://i.pinimg.com/236x/78/6e/00/786e00eab219eca59803d118fbe0feb3.jpg",
    "https://i.pinimg.com/236x/3b/42/b0/3b42b02bf047097582b26401df90cdb3.jpg",
    "https://i.pinimg.com/236x/de/13/6b/de136b0fa0037d3453a430895d8a5c27.jpg",
    "https://i.pinimg.com/236x/15/bf/41/15bf41a80a0ffb41cc9d0fd98abed34b.jpg",
    "https://i.pinimg.com/236x/c4/57/bd/c457bd9496170bfa3845b7cee775df65.jpg",
    "https://i.pinimg.com/236x/05/65/20/05652045e57af33599557db9f23188c0.jpg",
    "https://i.pinimg.com/236x/c5/83/53/c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg",
    "https://i.pinimg.com/564x/94/43/b9/9443b93bd8773fec91bc1837e8424e8e.jpg",
    "https://i.pinimg.com/564x/e6/8a/42/e68a42c2e530fbdf6b3ab2f379dcd384.jpg",
    "https://i.pinimg.com/236x/95/f3/73/95f373590dad79bcf3202ce6edad5bcd.jpg",
    "https://i.pinimg.com/236x/e7/c6/c6/e7c6c65c6e38f43d4b979d3cb1e46bf7.jpg",
    "https://i.pinimg.com/236x/fb/18/de/fb18deb4959e9a0678e1bf99105ea775.jpg",
    "https://i.pinimg.com/564x/c5/61/c2/c561c2a77d5b9b03702efc423b18cb9a.jpg",
    "https://i.pinimg.com/564x/64/cf/21/64cf2184d33446c4cf1cc8c3c585b9f4.jpg",
    "https://i.pinimg.com/236x/06/e8/14/06e814c8c5c82b9bf794add896616e12.jpg",
    "https://i.pinimg.com/236x/62/bb/97/62bb9727b2e09751d43c32589c503b39.jpg",
    "https://i.pinimg.com/564x/a9/f9/09/a9f90926afdfbff79f6d2a017c8e19dd.jpg",
    "https://i.pinimg.com/564x/96/2c/ce/962cce1d513d665ecca6eb733a90a160.jpg",
    "https://i.pinimg.com/564x/af/60/9e/af609e357a691876ac58d02e27af316e.jpg",
    "https://i.pinimg.com/236x/d5/5f/97/d55f97078c0d7b60b758cac3b34114c9.jpg",
    "https://i.pinimg.com/236x/22/45/e2/2245e261944f1eae080423f6ff7805e1--romantic-picnics-romantic-ideas.jpg",
    "https://i.pinimg.com/236x/65/df/cd/65dfcdd2fc433d45baedb3666cacfd82.jpg",
    "https://i.pinimg.com/564x/28/77/f4/2877f4e254c0bd27ac4f4c5d8a43404f.jpg",
    "https://i.pinimg.com/564x/8b/21/b0/8b21b0133442afd03d2c5e9a998c96b3.jpg",
    "https://i.pinimg.com/236x/48/9c/d9/489cd9ae5fec17977c73677866202d59.jpg",
    "https://i.pinimg.com/236x/14/73/0a/14730af41a58e05384b86b0bacf9d57b.jpg",
    "https://i.pinimg.com/236x/16/36/dd/1636dd650e6289cd0ec4f4f06dea7835--british-recipes-the-great-british-bake-off-recipes.jpg",
    "https://i.pinimg.com/564x/da/fe/1e/dafe1e26613892b2bc26508b33de353d.jpg",
    "https://i.pinimg.com/564x/f3/9c/11/f39c11819b48bf4dc34fa1670fb1fef6.jpg",
    "https://i.pinimg.com/236x/d4/32/cd/d432cdc35cf6cc5c7ec07a5036a87bca.jpg",
    "https://i.pinimg.com/236x/c1/d0/7f/c1d07f45a5c2b121255ba9ec54b9adf7.jpg",
    "https://i.pinimg.com/236x/18/dc/f7/18dcf759aa96740f8d335dc6231a9cf9.jpg",
    "https://i.pinimg.com/564x/63/3e/c1/633ec1128e0b7ed911c462cb89620c64.jpg",
    "https://i.pinimg.com/564x/4f/df/82/4fdf820192314371138c0f4f999cdddc.jpg",
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
    <div
      id="bottom"
      className="snap-center relative h-screen w-screen overflow-hidden"
    >
      <div className="flex justify-center w-full absolute -z-[1]">
        <div className="grid grid-rows-5 grid-flow-col gap-3 w-fit h-fit">
          {images.map((value: string, index: number) => (
            <div
              key={index}
              className={` min-w-[236px] max-w-[236px] ${
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
                className="rounded-2xl  object-cover h-[350px] size-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-screen h-screen bg-black bg-opacity-60 flex flex-row">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-white text-[70px] w-[450px] font-semibold font-roboto1 leading-tight">
            Sign up to get your ideas
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <SingIn
            open={open}
            setOpen={setOpen}
            isSignin={isSignin}
            setIsSignin={setIsSignin}
          />
        </div>
      </div>

      <div className="w-full absolute top-[85px] flex justify-center">
        <div
          onClick={() => route.push("#home")}
          className={`size-[48px]   bg-[#940343] rounded-full z-20 flex justify-center items-center mb-[16px] cursor-pointer`}
        >
          <svg
            aria-label="Scroll down"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            className="fill-white rotate-180"
          >
            <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
          </svg>
        </div>
      </div>

      <div className="h-[5vh] absolute bottom-0 bg-white w-screen flex flex-row items-center justify-center">
        {text.map((value: string, index: number) => (
          <div
            key={index}
            className="text-[12px] text-nowrap hover:underline mr-2 roboto2 font-semibold"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
