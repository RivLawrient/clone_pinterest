import { SetStateAction, useRef } from "react";

export default function Modal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef(null);

  if (!open) return null;

  return (
    <div
      ref={ref}
      hidden={open}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        e.target === ref.current ? setOpen(!open) : null
      }
      className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-60 z-50"
    >
      <div className="h-[634px] w-[484px] bg-white rounded-[32px]"></div>
    </div>
  );
}
