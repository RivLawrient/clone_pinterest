import React, { useEffect, useRef } from "react";
import { useUser } from "@/app/(userContext)/User";

export default function DropDownMsg({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  if (!isVisible) return null;
  return (
    <>
      <div
        ref={ref}
        style={{
          height: `calc(-88px + 100vh)`,
        }}
        className="fixed right-0 top-0 z-20 mb-2 mr-2 mt-[80px] flex w-[360px] flex-col rounded-2xl bg-white shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px]"
      >
        <div className="py-[23px] text-center leading-none">
          <span className="text-[16px] font-medium">Updates</span>
        </div>
        <div className="flex flex-col">
          <div className="px-[16px] pb-2">
            <span className="text-[20px] font-medium">Seen</span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
