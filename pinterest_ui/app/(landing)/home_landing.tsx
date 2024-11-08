"use client";

import { useEffect, useState } from "react";
import { AnimateBtn, AnimateImg, AnimateText } from "./animation";
import { useRouter } from "next/navigation";

export default function HomeLanding() {
  const [step, setStep] = useState<number>(-1);

  const [isPaused, setIsPaused] = useState(false);
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
      observerOptions
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
      id="home"
      className="snap-center h-screen w-screen relative flex flex-col items-center scroll-smooth"
    >
      <div className="h-[250px]"></div>
      <span className="text-[60px] font-roboto2">Get your next</span>
      <br />
      <AnimateText step={step} />
      <AnimateImg step={step} setStep={setStep} />
      <div className="h-[200px] w-full bottom-0 absolute flex flex-col items-center justify-end bg-gradient-to-b from-transparent to-white">
        <AnimateBtn step={step} />
        <div className="h-[60px] w-full bg-[#FFFD92] flex justify-center items-center ">
          <div
            onClick={() => {
              route.push("#search");
            }}
            className=" text-[16px] font-roboto flex cursor-pointer gap-2"
          >
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
