"use client";
import { time } from "console";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setInterval } from "timers";

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

  //   const [index, setIndex] = useState(0);
  //   const [ind, setInd] = useState<string[]>([imageArray[0][0]]);
  //   useEffect(() => {
  //     setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  //     }, 5000);
  //   }, []);

  //   useEffect(() => {
  //     for (let i = 0; i < 35; i++) {
  //       setTimeout(() => {
  //         setInd((prevInd) => {
  //           const newInd = [...prevInd];
  //           newInd[i] = imageArray[index][i];

  //           return newInd;
  //         });
  //       }, i * 50);
  //     }
  //   }, [index]);
  //   return (
  //     <div className="grid grid-rows-5 grid-flow-col gap-2">
  //       {imageArray[index].map((value: string, indexs: number) => [
  //         <img
  //           key={index}
  //           src={}
  //           width={236}
  //           height={350}
  //           alt=""
  //           className="animate-fade object-cover opacity-0 del"
  //         />,
  //       ])}
  //     </div>
  //   );

  //   const images: string[] = [
  //     "/gambar_landing1.jpg",
  //     "/gambar_landing2.jpg",
  //     "/gambar_landing3.jpg",
  //     "/gambar_landing4.jpg",
  //   ];

  //   //   const ar: string[] = ["1", "2", "3", "4", "5"];
  //   const [index, setIndex] = useState<string>();

  //   //   useEffect(() => {
  //   //     const interval = setInterval(() => {
  //   //       setIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   //     }, 5000);

  //   //     return () => clearInterval(interval);
  //   //   }, []);

  //   const [ar, setAr] = useState(["/gambar_landing1.jpg"]);
  //   const [key, setKey] = useState(0);

  //   const addImage = () => {
  //     // Menambahkan gambar baru ke array, ganti dengan gambar yang sesuai
  //     const newImage = `/gambar_landing${ar.length + 1}.jpg`;
  //     setAr([...ar, newImage]);
  //   };

  //   const reset = () => {
  //     setAr((prevAr) => {
  //       // Create a new array with the first element set to "/gambar_landing1.jpg"
  //       const newAr = [...prevAr];
  //       newAr[0] = "/gambar_landing2.jpg"; // Update only the first element
  //       return newAr; // Return the new array
  //     });
  //     setKey((prevKey) => prevKey + 1);
  //   };
  //   return (
  //     <div
  //       //   key={key}
  //       className="relative flex-col gap-2 h-full items-center justify-center flex"
  //     >
  //       <button onClick={addImage} style={{ marginTop: "20px" }}>
  //         Tambah Gambar
  //       </button>
  //       <button onClick={reset}>reset</button>
  //       {/* <img

  //         src={images[index]}
  //         alt=""
  //         width={236}
  //         height={350}
  //         key={index}
  //         className="object-cover animate-fade opacity-0 rounded-xl"
  //       /> */}
  //       {ar.map((src, index) => (
  //         <img
  //           key={key}
  //           src={src}
  //           alt={`Image ${index + 1}`}
  //           width={236}
  //           height={350}
  //           className="object-cover animate-fade opacity-0 rounded-xl"
  //         />
  //       ))}
  //     </div>
  //   );

  //   const [index, setIndex] = useState<number>(0);
  //   const [ar, setAr] = useState<string[]>([`/gambar_landing1.jpg`]);
  //   useEffect(() => {
  //     setInterval(() => {
  //       setAr([...ar, `/gambar_landing${ar.length + 1}.jpg`]);
  //     }, 1000);
  //   }, [index]);

  //   useEffect(() => {
  //     setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % 4);
  //     }, 5000);
  //   });

  //   return (
  //     <div>
  //       {ar.map((value: string, indexs: number) => [
  //         <h1 key={indexs}>{value}</h1>,
  //       ])}
  //     </div>
  //   );
  //   const [index, setIndex] = useState<number>(0);
  //   useEffect(() => {
  //     setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % 4);
  //     }, 5000);
  //   });

  //   useEffect(() => {
  //     for (let indexs = 0; indexs < 10; indexs++) {
  //       setInterval(() => {
  //         console.log(indexs);
  //       }, i * 1000);
  //     }
  //   }, [index]);
  //   return <div>{index}</div>;

  // const [ar, setAr] = useState<string[]>(["/gambar_landing1.jpg"]);

  // useEffect(() => {
  //   const hasil = setInterval(() => {
  //     setAr((prevAr) => {
  //       if (prevAr.length < 4) {
  //         return [...prevAr, `/gambar_landing${prevAr.length + 1}.jpg`];
  //       } else {
  //         clearInterval(hasil);
  //         return [
  //           `/gambar_landing${prevAr.length - 1}.jpg`,
  //           ...prevAr.slice(1),
  //         ];
  //       }
  //     });
  //   }, 500);

  //   return () => clearInterval(hasil);
  // }, []);

  // <div className="flex flex-col w-full items-center">
  //   {images.map((value: string[], index: number) => [
  //     <div key={index} className={`grid grid-cols-7 w-fit absolute`}>
  //       {value.map((values: string, indexs: number) => [
  //         <img
  //           key={index}
  //           src={values}
  //           width={200}
  //           className="animate-fade"
  //         />,
  //       ])}
  //     </div>,
  //   ])}
  // </div>
  const [step, setStep] = useState<number>(0);
  const [tep, setTep] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setStep((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  }, []);

  // useEffect(() => {
  //   setTep(0);
  //   const tepInterval = setInterval(() => {
  //     setTep((prevTep) => {
  //       if (prevTep >= 34) {
  //         clearInterval(tepInterval);
  //         return prevTep;
  //       }
  //       return prevTep + 1;
  //     });
  //   }, 100);

  //   return () => clearInterval(tepInterval);
  // }, [step]);

  useEffect(() => {
    console.log("tep:", tep, "step:", step);
  }, [tep]);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      {images.map((value: string[], index: number) => [
        <div
          key={index}
          className=" grid grid-rows-5 grid-flow-col gap-2 absolute"
        >
          {value.map((values: string, indexs: number) => [
            <div
              key={indexs}
              className={`${
                index === step && indexs <= tep
                  ? "opacity-0 animate-fade"
                  : "opacity-5"
              }`}
            >
              {index}
            </div>,
          ])}
        </div>,
      ])}
    </div>
  );
}
