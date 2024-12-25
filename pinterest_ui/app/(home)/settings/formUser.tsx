"use client";
import { useUser } from "@/app/(userContext)/User";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FormUser {
  username: string;
  first_name: string;
  last_name: string;
  profile_img: string;
}

interface FormContextProps {
  form: FormUser;
  setForm: React.Dispatch<React.SetStateAction<FormUser>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [form, setForm] = useState<FormUser>({
    username: "",
    first_name: "",
    last_name: "",
    profile_img: "",
  });

  useEffect(() => {
    setForm({
      username: user?.username || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      profile_img: user?.profile_img || "",
    });
  }, [user]);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
