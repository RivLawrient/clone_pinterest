import { useState } from "react";

export default function DetailBtn() {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowDetail(!showDetail)}
        className="z-[2] flex size-[32px] cursor-pointer select-none items-center justify-center overflow-visible rounded-full bg-white transition-all hover:bg-[#d6d6d6] active:scale-90"
      >
        <svg
          aria-hidden="true"
          aria-label=""
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
          className="fill-black"
        >
          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
        </svg>
        {showDetail ? <Detail /> : null}
      </div>
    </>
  );
}

function Detail() {
  return (
    <div className="absolute left-0 top-[100%] z-[51] mt-2 w-[200px] rounded-md bg-black p-4 text-white shadow-lg">
      ini show
    </div>
  );
}
