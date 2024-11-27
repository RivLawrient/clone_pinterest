// "use client";
// import { useEffect, useRef, useState } from "react";
// import { FixedSizeList } from "react-window";

// export default function MasonryLoading() {
//   // const { post } = usePost();
//   const [leng, setLeng] = useState(0);
//   const post: string[] = Array(30).fill("");
//   const result = Array.from({ length: leng }, (_, i) =>
//     post?.filter((_, index) => index % leng === i),
//   );
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const updateColumns = () => {
//       if (ref.current) {
//         setLeng(Math.max(2, Math.floor(ref.current.clientWidth / 253)));
//       }
//     };

//     updateColumns();
//     window.addEventListener("resize", updateColumns);
//     return () => {
//       window.removeEventListener("resize", updateColumns);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={ref} className="flex w-screen justify-center">
//         <div className="flex flex-row gap-4">
//           {result.map((value, index) => (
//             <div
//               key={index}
//               className="flex flex-col gap-4"
//               style={{
//                 width: `${238}px`,
//               }}
//             >
//               {value?.map((val, ind) => (
//                 <div
//                   style={{
//                     height: Math.random() * 200 + 120,
//                   }}
//                   className={`w-full rounded-2xl bg-slate-500`}
//                   key={ind}
//                 ></div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";

export default function MasonryLoading() {
  const [numColumns, setNumColumns] = useState(0);
  const post: string[] = Array(30).fill(""); // Replace with real data if available
  const ref = useRef<HTMLDivElement>(null);

  // Update the number of columns based on the container's width
  useEffect(() => {
    const updateColumns = () => {
      if (ref.current) {
        setNumColumns(Math.max(2, Math.floor(ref.current.clientWidth / 253)));
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // Create a function to get the height of each item
  const getItemSize = (index: number) => Math.random() * 200 + 120; // Example height logic

  // Render each item in the masonry layout
  const Item = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const col = index % numColumns;
    return (
      <div
        style={{
          ...style,
          width: 238, // Set the width of each column
          marginBottom: 16, // Adjust as necessary
        }}
        className="rounded-2xl bg-slate-500"
      >
        <div style={{ height: getItemSize(index) }}></div>
      </div>
    );
  };

  // Flatten the data into a structure compatible with react-window
  const data = Array.from({ length: post.length }, (_, index) => index);

  return (
    <div ref={ref} className="flex w-screen justify-center">
      <VariableSizeList
        height={window.innerHeight}
        itemCount={data.length}
        itemSize={getItemSize}
        width={ref.current?.clientWidth || 0}
        layout="horizontal"
      >
        {({ index, style }) => <Item index={index} style={style} />}
      </VariableSizeList>
    </div>
  );
}
