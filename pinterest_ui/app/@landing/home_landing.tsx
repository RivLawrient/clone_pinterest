"use client";

import { useEffect, useState } from "react";
import { AnimateBtn, AnimateImg, AnimateText } from "./animation";
import { useRouter } from "next/navigation";
import { buffer } from "stream/consumers";

export default function HomeLanding({ scroll }: { scroll: () => void }) {
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

  const route = useRouter();
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
    <div
      // id="home"
      className="relative flex h-screen w-screen snap-center flex-col items-center scroll-smooth align-baseline"
    >
      <div className="h-[250px]"></div>
      <span className="font-roboto2 text-[60px]">Get your next</span>
      <br />
      <AnimateText step={step} />
      <AnimateImg step={step} setStep={setStep} />
      <div className="absolute bottom-0 flex h-[200px] w-full flex-col items-center justify-end bg-gradient-to-b from-transparent to-white">
        <AnimateBtn step={step} scroll={scroll} />
        <div className="flex h-[60px] w-full items-center justify-center bg-[#FFFD92]">
          <div
            onClick={scroll}
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
  );
}
