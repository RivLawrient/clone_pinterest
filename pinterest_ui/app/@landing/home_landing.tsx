"use client";

import { useEffect, useState } from "react";
import { AnimateBtn, AnimateImg, AnimateText } from "./animation";
import GoogleLogin from "./(modal)/googleLogin";
import { useModal } from "./(modalContext)/Modal";

export default function HomeLanding({
  setTranslate,
}: {
  setTranslate: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [step, setStep] = useState<number>(-1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const sections = document.querySelectorAll(".snap-center");
    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      });
    };
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (step === -1) {
      setStep((step + 1) % 4);
    } else {
      const timer = setTimeout(() => {
        const nextStep = (step + 1) % 4;
        if (nextStep === 0) {
          setStep(4);
          setTimeout(() => {
            setStep(0);
          }, 2000);
        } else {
          setStep(nextStep);
        }
      }, 5400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <>
      <div className="home-section relative flex h-screen w-screen snap-center flex-col items-center scroll-smooth align-baseline">
        <div className="md:h-[250px]"></div>
        <span className="hidden font-roboto2 text-[60px] md:block">
          Get your next
        </span>
        <br className={`hidden md:block`} />
        <Cover />
        <AnimateText step={step} />
        <AnimateImg step={step} />
        <div className="absolute bottom-0 z-[3] flex h-[200px] w-full flex-col items-center justify-end bg-gradient-to-b from-transparent md:to-white">
          <AnimateBtn step={step} setTranslate={setTranslate} />
          <div className="flex h-[60px] w-full items-center justify-center bg-[#FFFD92]">
            <div
              onClick={() => {
                setTranslate(window.innerHeight);
              }}
              className="flex cursor-pointer gap-2 font-roboto text-[16px]"
            >
              Here’s how it works
              <div className="flex items-center justify-center">
                <svg
                  aria-label="arrow down icon"
                  className="fill-black"
                  height="12"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Cover() {
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
          className={`mt-3 max-w-[250px] text-center text-[36px] leading-tight text-white`}
        >
          Welcome to Pinterest
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
