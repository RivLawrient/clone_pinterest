"use client";

import { useEffect, useState } from "react";
import { AnimateBtn, AnimateImg, AnimateText } from "./animation";

export default function HomeLanding() {
  const [step, setStep] = useState<number>(-1);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true); // Set animasi ke mode 'paused'
      } else {
        setIsPaused(false); // Lanjutkan animasi
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
    <div className="snap-start h-screen w-screen relative flex flex-col items-center">
      <div className="h-[250px]"></div>
      <span className="text-[60px] font-roboto">Get your next</span>
      <br />
      <AnimateText step={step} />
      <AnimateImg step={step} setStep={setStep} />
      <div className="h-[200px] w-full bottom-0 absolute flex flex-col items-center justify-end bg-gradient-to-b from-transparent to-white">
        <AnimateBtn step={step} />
        <div className="h-[60px] w-full bg-[#FFFD92] flex justify-center items-center ">
          <div className=" text-[16px] font-roboto flex cursor-pointer gap-2">
            Here’s how it works
            <div className="justify-center flex items-center">
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
  );
}
