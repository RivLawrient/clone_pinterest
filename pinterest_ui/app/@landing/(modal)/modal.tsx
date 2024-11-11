import { SetStateAction, useRef, useState } from "react";
import SingIn from "./signin";
import SingUp from "./signup";

export default function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
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
      className="fixed z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-60"
    >
      {children}
    </div>
  );
}
