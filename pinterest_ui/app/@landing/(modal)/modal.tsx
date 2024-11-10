import { SetStateAction, useRef, useState } from "react";
import SingIn from "./signin";
import SingUp from "./singup";

export default function Modal({
  open,
  setOpen,
  isSignin,
  setIsSignin,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignin: boolean;
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [pass, setPass] = useState<string>("password");
  const ref = useRef(null);

  if (!open) return null;

  return (
    <div
      ref={ref}
      hidden={open}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        e.target === ref.current ? setOpen(!open) : null
      }
      className="w-screen h-screen flex flex-col justify-center items-center fixed  bg-black bg-opacity-60 z-50"
    >
      <SingIn
        open={open}
        setOpen={setOpen}
        isSignin={isSignin}
        setIsSignin={setIsSignin}
      />
      <SingUp
        open={open}
        setOpen={setOpen}
        isSignin={isSignin}
        setIsSignin={setIsSignin}
      />
    </div>
  );
}
