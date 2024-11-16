"use client";
import { useState } from "react";
import Modal from "./(modal)/modal";
import SingIn from "./(modal)/signin";
import SingUp from "./(modal)/signup";
import SignUp from "./(modal)/signup";
import { usePathname } from "next/navigation";

export default function HeaderLanding() {
  const [open, setOpen] = useState<boolean>(false);
  const [isSignin, setIsSignin] = useState<string>("");
  return (
    <>
      <div className="fixed top-0 z-50 flex h-[80px] w-screen items-center justify-between bg-white p-4">
        <div className="flex flex-row items-center">
          <div className="flex items-center px-3">
            <svg
              aria-label="Pinterest"
              height="32"
              role="img"
              viewBox="0 0 24 24"
              width="32"
              className="fill-[#CC0000]"
            >
              <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
            </svg>
            <div className="ml-1 flex items-center font-roboto2 text-[20px] tracking-[-1px] text-[#CC0000]">
              Pinterest
            </div>
          </div>
          <div className="flex h-[48px] items-center px-4 font-roboto text-[16px]">
            Today
          </div>
          <div className="flex h-[48px] items-center px-4 font-roboto text-[16px]">
            Watch
          </div>
          <div className="flex h-[48px] items-center px-4 font-roboto text-[16px]">
            Explore
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-6 flex">
            <div className="m-4 font-roboto text-[16px]">About</div>
            <div className="m-4 font-roboto text-[16px]">Business</div>
            <div className="m-4 font-roboto text-[16px]">Blog</div>
          </div>
          <div
            onClick={() => {
              setIsSignin("signin");
              setOpen(true);
            }}
            className="mr-2 cursor-pointer text-nowrap rounded-full bg-[#E60023] px-3 py-2 font-roboto text-[16px] text-white hover:bg-[#c9001e]"
          >
            Log in
          </div>
          <div
            onClick={() => {
              setIsSignin("signup");
              setOpen(true);
            }}
            className="mr-2 cursor-pointer text-nowrap rounded-full bg-[#E9E9E9] px-3 py-2 font-roboto text-[16px] text-black hover:bg-[#d7d7d7]"
          >
            Sign up
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <SingIn
          isSignin={isSignin}
          setIsSignin={setIsSignin}
          setOpen={setOpen}
        />
        <SignUp
          isSignin={isSignin}
          setIsSignin={setIsSignin}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
}
