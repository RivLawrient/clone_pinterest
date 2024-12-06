"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotif } from "../(notifContext)/Notif";
import Logout from "../(home)/(Header)/logout";

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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      try {
        fetch("http://127.0.0.1:4000/user", {
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          } else {
            await fetch("http://127.0.0.1:4000/bye", {
              credentials: "include",
            }).then((res) => {
              if (res.ok) {
                window.location.reload();
              }
            });
          }
        });
      } catch (err) {}
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user?.birth_date && <BirthDateForm user={user} />}
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

function BirthDateForm({ user }: { user: User | null }) {
  const [birth, setBirth] = useState<number>(0);
  const { setIsError, setMsg, triggerNotif } = useNotif();

  async function HandleContinue() {
    try {
      await fetch("http://127.0.0.1:4000/user/update_birth/" + birth, {
        method: "PUT",
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          setMsg(data.errors);
          setIsError(true);
          triggerNotif();
        }
      });
    } catch {}
  }
  return (
    <>
      {user && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[52] flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col items-center justify-center rounded-[32px] bg-white p-5 px-12 text-center">
            <div className="text-[50px]">🎂</div>
            <div className="text-[36px] font-semibold">
              Enter your birthdate
            </div>
            <div className="mb-8 w-[310px] text-wrap text-[16px] leading-tight">
              To help keep Pinterest safe, we now require your birthdate. Your
              birthdate also helps us provide more personalized recommendations
              and relevant ads. We won't share this information without your
              permission and it won't be visible on your profile.
            </div>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBirth(new Date(e.target.value).getTime());
              }}
              type="date"
              placeholder=""
              className="mb-4 w-[280px] rounded-2xl border-[2px] border-[#cdcdcd] px-4 py-3 text-[16px]"
            />
            <div className="mb-10 w-[280px] text-wrap text-[16px] text-[#767676]">
              Use your own birthday, even if this a business account
            </div>
            <div
              onClick={() => {
                birth ? HandleContinue() : null;
              }}
              className={`mb-3 w-[280px] rounded-3xl px-3 py-2 ${birth ? "cursor-pointer bg-red-600 text-white" : "bg-[#c9c9c9] text-[#535353]"} `}
            >
              Continue
            </div>
            <div className="mb-[8px] mt-2 w-[340px] text-wrap text-center text-[12px] leading-4 text-[#767676]">
              By continuing, you agree to Pinterest's{" "}
              <span className="font-bold text-black">Terms of Service</span> and
              acknowledge you've read our
              <span className="font-bold text-black">
                {" "}
                Privacy Policy . Notice at collection .
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
