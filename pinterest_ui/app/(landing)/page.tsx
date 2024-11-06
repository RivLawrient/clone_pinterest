"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function Landing() {
  const images = [
    [
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
      "/gambar_landing1.jpg",
    ],
    [
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
      "/gambar_landing2.jpg",
    ],
    [
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
      "/gambar_landing3.jpg",
    ],
    [
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
      "/gambar_landing4.jpg",
    ],
  ];

  const [step, setStep] = useState<number>(0);
  const [current, setCurrent] = useState<number[]>([-1, -1, -1, -1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        const nextStep = (prevStep + 1) % 4;
        for (let i = 0; i <= 35; i++) {
          setTimeout(() => {
            setCurrent((prev) =>
              prev.map((v, index) => (index === prevStep ? i - 1 : v))
            );
          }, 50 * i);
        }
        return nextStep;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      {images.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-rows-5 gap-2 grid-flow-col top-6 absolute"
        >
          {row.map((imageUrl, colIndex) => (
            <img
              key={colIndex}
              src={imageUrl}
              width={100}
              className={`${
                current[rowIndex] >= colIndex ? "animate-fade" : ""
              } opacity-0 rounded-xl
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
