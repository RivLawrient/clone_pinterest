"use client";
import { useEffect, useRef, useState } from "react";

export default function MasonryLoading() {
  // const { post } = usePost();
  const [leng, setLeng] = useState(0);
  const post: string[] = Array(30).fill("");
  const result = Array.from({ length: leng }, (_, i) =>
    post?.filter((_, index) => index % leng === i),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (ref.current) {
        setLeng(Math.max(2, Math.floor(ref.current.clientWidth / 253)));
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="flex w-screen justify-center">
        <div className="flex flex-row gap-4">
          {result.map((value, index) => (
            <div
              key={index}
              className="flex flex-col gap-4"
              style={{
                width: `${238}px`,
              }}
            >
              {value?.map((val, ind) => (
                <div
                  style={{
                    height: Math.random() * 200 + 120,
                  }}
                  className={`w-full rounded-2xl bg-slate-500`}
                  key={ind}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
