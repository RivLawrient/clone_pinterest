import React, { useState } from "react";
import GoogleLogin from "./googleLogin";

export default function SingIn({
  isSignin,
  setIsSignin,
  setOpen,
}: {
  isSignin: string;
  setIsSignin: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [pass, setPass] = useState<string>("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (isSignin != "signin") return null;
  return (
    <div className="relative flex h-fit w-[484px] flex-col items-center justify-center rounded-[32px] bg-white px-[10px] pb-6 pt-[20px]">
      <div
        onClick={() => {
          setOpen(false);
        }}
        className="absolute right-0 top-0 m-4 flex size-[40px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100"
      >
        <svg
          aria-hidden="true"
          aria-label=""
          className="fill-black"
          height="18"
          role="img"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
        </svg>
      </div>

      <div className="my-2">
        <svg
          height="40"
          viewBox="-3 -3 82 82"
          width="40"
          className="fill-[#E60023]"
        >
          <title>Pinterest logo</title>
          <circle cx="38" cy="38" fill="white" r="40"></circle>
          <path
            d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z"
            fill="var(--color-red-pushpin-450)"
          ></path>
        </svg>
      </div>
      <div className="font-roboto1 text-[32px] font-semibold tracking-[-1.2px] text-[#333333]">
        Welcome to Pinterest
      </div>
      <div className="mx-[98px] mt-[20px] w-[268px]">
        <div className="mb-[12px] flex flex-col">
          <span className="ml-[8px] text-[14px]">Email</span>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="rounded-2xl border-[2px] border-[#cdcdcd] px-4 py-3 text-[16px]"
          />
        </div>
        <div className="relative flex flex-col">
          <span className="ml-[8px] text-[14px]">Password</span>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            type={pass}
            placeholder="Password"
            className="rounded-2xl border-[2px] border-[#cdcdcd] px-4 py-3 text-[16px]"
          />
          <div className="absolute bottom-0 right-0 mr-[10px] flex h-[48px] items-center">
            <svg
              onClick={() => {
                if (pass !== "text") {
                  setPass("text");
                } else setPass("password");
              }}
              aria-hidden="true"
              aria-label=""
              className="cursor-pointer fill-black"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0m2 5a5 5 0 1 1 0-10 5 5 0 0 1 0 10m0-13.5A12.7 12.7 0 0 0 0 12a12.73 12.73 0 0 0 24 0 12.7 12.7 0 0 0-12-8.5"></path>
            </svg>
          </div>
        </div>
        <div className="my-[8px] cursor-pointer text-[14px] hover:underline">
          Forgot your password?
        </div>
        <div className="">
          <div className="cursor-pointer rounded-full bg-[#e60023] py-2 text-center text-white hover:bg-[#B60000] active:bg-[#8c1818]">
            Log in
          </div>
        </div>
        <div className="my-[8px] text-center">OR</div>
        {/* <div className="w-full">
          <div className="rounded-full bg-[#1877f2] py-2 text-center text-white">
            Continue with Facebook
          </div>
        </div> */}
        <div onClick={GoogleLogin} className="w-full">
          <div className="relative mt-[12px] flex cursor-pointer items-center justify-center rounded-full border py-2 text-center hover:bg-slate-100">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="absolute left-0 ml-3 size-[18px]"
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
        </div>
      </div>
      <div className="mt-[24px] w-[320px] text-wrap text-center text-[12px] leading-4">
        By continuing, you agree to Pinterest's{" "}
        <span className="font-bold">Terms of Service</span> and acknowledge
        you've read our
        <span className="font-bold">
          {" "}
          Privacy Policy . Notice at collection .
        </span>
      </div>
      <hr className="mx-auto my-[12px] w-[110px]" />
      <div className="text-center text-[12px]">
        Not on Pinterest yet?{" "}
        <span
          onClick={() => {
            setIsSignin("signup");
          }}
          className="cursor-pointer font-bold hover:underline"
        >
          Sign up
        </span>
      </div>
      <div className="text-center text-[12px]">
        Are you a business?
        <span className="cursor-pointer font-bold hover:underline">
          {" "}
          Get started here!
        </span>
      </div>
    </div>
  );
}
