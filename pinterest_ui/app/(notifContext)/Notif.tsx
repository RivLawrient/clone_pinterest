"use client";
import React, { createContext, useContext, useState } from "react";

type NotifContextType = {
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  triggerNotif: () => void;
};

const NotifContext = createContext<NotifContextType | undefined>(undefined);

export const NotifProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const triggerNotif = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  return (
    <NotifContext.Provider value={{ setMsg, setIsError, triggerNotif }}>
      {show && msg && (
        <div
          className={`pointer-events-none fixed left-0 right-0 z-[51] flex justify-center ${isError ? "top-0" : "bottom-0"}`}
        >
          <div
            className={`z-[51] my-5 rounded-xl p-3 text-[16px] text-white ${isError ? "bg-red-500" : "bg-black"}`}
          >
            {msg}
            {/* something error */}
          </div>
        </div>
      )}
      {children}
    </NotifContext.Provider>
  );
};

export const useNotif = () => {
  const context = useContext(NotifContext);
  if (context === undefined) {
    throw new Error("useNotif must be used within a NotifProvider");
  }
  return context;
};
