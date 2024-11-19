import { useEffect, useRef, useState } from "react";
import MasonryItem from "./masonryItem";

export default function Masonry({ images }: { images: string[] }) {
  const [leng, setLeng] = useState(0);
  const result = Array.from({ length: leng }, (_, i) =>
    images.filter((_, index) => index % leng === i),
  );
  const ref = useRef<HTMLDivElement>(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
              {value.map((val, ind) => (
                <MasonryItem src={val} key={ind} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
