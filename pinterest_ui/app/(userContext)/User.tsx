"use client";
import { createContext, useContext, useState, useEffect } from "react";

type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_google: boolean;
  birth_date: string;
  profile_img: string;
  created_at: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      fetch("http://127.0.0.1:4000/user", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUser(data.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
