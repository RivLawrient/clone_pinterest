"use client";
import { useEffect, useState } from "react";
import { AnimateImg } from "./animation";

export default function Landing() {
  const [btn, setBtn] = useState<boolean>();

  useEffect(() => {});
  return (
    <div className="w-screen h-screen justify-center flex items-center ">
      <AnimateImg />
    </div>
  );
}
