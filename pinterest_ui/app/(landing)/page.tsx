"use client";
import { useEffect, useState } from "react";

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

  // useEffect(() => {
  //   setCurrent((prev) =>
  //     prev.map((value: number, index: number) => {
  //       if (index === (step + 1) % 4) {
  //         return -1;
  //       } else {
  //         return value;
  //       }
  //     })
  //   );
  //   for (let i = 0; i <= 35; i++) {
  //     setTimeout(() => {
  //       setCurrent((prev) =>
  //         prev.map((value: number, index: number) => {
  //           if (index === step) {
  //             return value + 1;
  //           } else {
  //             return value;
  //           }
  //         })
  //       );
  //     }, 50 * i);
  //   }
  // }, [step]);
  useEffect(() => {
    for (let index = 0; index < 24; index++) {
      setTimeout(() => {
        console.log("step", index);
      }, 500);
    }
  });

  // useEffect(() => {
  //   if (current[step] === 1) {
  //     setTimeout(() => {
  //       setStep((prev) => (prev + 1) % 4);
  //     }, 5000);
  //   }
  // }, [current[step]]);

  // useEffect(() => {
  //   console.log(current, step);
  // }, [current]);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      {images.map((value: string[], index: number) => [
        <div
          key={index}
          className=" grid grid-rows-5 grid-flow-col gap-2 top-6 absolute "
        >
          {value.map((values: string, indexs: number) => [
            <img
              key={indexs}
              src={values}
              width={100}
              className={`${
                current[index] >= indexs ? "animate-fade" : ""
              } opacity-0 rounded-xl`}
            />,
          ])}
        </div>,
      ])}
    </div>
  );
}
