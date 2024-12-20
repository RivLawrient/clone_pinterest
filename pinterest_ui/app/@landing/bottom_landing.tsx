"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SingIn from "./(modal)/signin";
import SignUp from "./(modal)/signup";
import { useModal } from "./(modalContext)/Modal";
import Modal from "./(modal)/modal";
import Form from "./(modal)/form";
import GoogleLogin from "./(modal)/googleLogin";

export default function BottomLanding() {
  const { show, setShow } = useModal();
  const [pass, setPass] = useState<string>("password");
  const [isSignin, setIsSignin] = useState<boolean>(false);
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
    <>
      <div className="relative h-screen w-screen snap-center overflow-hidden">
        <div className="absolute -z-[1] flex w-full justify-center">
          <div className="grid h-fit w-fit grid-flow-col grid-rows-5 gap-3">
            {images.map((value: string, index: number) => (
              <div
                key={index}
                className={`min-w-[180px] max-w-[180px] md:min-w-[236px] md:max-w-[236px] ${
                  (index >= 5 && index <= 9) || (index >= 25 && index <= 29)
                    ? "mt-[-160px]"
                    : (index >= 10 && index <= 14) ||
                        (index >= 20 && index <= 24)
                      ? "mt-[-240px]"
                      : index >= 15 && index <= 19
                        ? "mt-[-400px]"
                        : ""
                }`}
              >
                <img
                  src={value}
                  alt=""
                  className="size-full h-[230px] rounded-2xl object-cover md:h-[350px]"
                />
              </div>
            ))}
          </div>
        </div>

        <CoverBtm />
        <div className="relative hidden h-screen w-screen flex-row bg-black bg-opacity-60 md:flex">
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
                isPopUp={false}
              />
            )}
          </div>
        </div>

        <div className="absolute top-[85px] hidden w-full justify-center md:flex">
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

        <div className="absolute bottom-0 hidden h-[5vh] w-screen flex-row items-center justify-center bg-white md:flex">
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
    </>
  );
}

function CoverBtm() {
  const { show, setShow } = useModal();
  return (
    <>
      <div
        className={`absolute z-[2] flex h-full w-full flex-col items-center justify-center bg-black/70 md:hidden`}
      >
        <div>
          <svg
            aria-label="logo"
            height="48"
            role="img"
            viewBox="0 0 24 24"
            width="48"
            className={`fill-white`}
          >
            <path d="M7.54 23.15q-.2-2.05.26-3.93L9 14.04a7 7 0 0 1-.35-2.07c0-1.68.81-2.88 2.09-2.88.88 0 1.53.62 1.53 1.8q0 .57-.23 1.28l-.52 1.72q-.15.5-.15.92c0 1.2.91 1.87 2.08 1.87 2.09 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.12-5.05-5.12-3.36 0-5.49 2.19-5.49 5.24 0 1.22.38 2.36 1.11 3.14-.24.41-.5.48-.88.48-1.2 0-2.34-1.69-2.34-4 0-4 3.2-7.17 7.68-7.17 4.7 0 7.66 3.29 7.66 7.33s-2.88 7.15-5.98 7.15a3.8 3.8 0 0 1-3.06-1.48l-.62 2.5a11 11 0 0 1-1.62 3.67A11.98 11.98 0 0 0 24 12a11.99 11.99 0 1 0-24 0 12 12 0 0 0 7.54 11.15"></path>
          </svg>
        </div>
        <div
          className={`mt-3 max-w-[350px] text-center text-[36px] leading-tight text-white`}
        >
          Sign up to explore the world's best ideas
        </div>
        <div
          onClick={() => setShow(true)}
          className={`mt-5 min-w-[200px] rounded-full bg-red-600 px-4 py-2 text-center text-[16px] text-white`}
        >
          Continue with email
        </div>
        <div
          onClick={GoogleLogin}
          className={`mt-2 flex min-w-[200px] items-center gap-2 rounded-full bg-white px-3 py-2 text-[16px]`}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width={18}
            height={18}
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Continue with Google
        </div>
        <div className={`mt-10 flex flex-row text-[12px] text-white`}>
          Already a member ? <div> Log in</div>
        </div>
        <div className={`mt-10 px-6 text-center text-[12px] text-white`}>
          By continuing, you agree to Pinterest's Terms of Service and
          acknowledge you've read our Privacy Policy. Notice at collection.
        </div>
      </div>
    </>
  );
}
