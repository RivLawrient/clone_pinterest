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
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    // if (!user) {
    //   try {
    //     setIsloading(true);
    //     fetch(`${process.env.HOST_API_PUBLIC}/user`, {
    //       credentials: "include",
    //     }).then(async (res) => {
    //       const data = await res.json();
    //       if (res.ok) {
    //         setUser(data.data);
    //       } else {
    //         await fetch(`${process.env.HOST_API_PUBLIC}/bye`, {
    //           credentials: "include",
    //         }).then((res) => {
    //           if (res.ok) {
    //             window.location.reload();
    //           }
    //         });
    //       }
    //     });
    //   } catch (err) {
    //   } finally {
    //     setIsloading(false);
    //   }
    // }
    if (!user) {
      // setIsloading(true);
      fetch(`${process.env.HOST_API_PUBLIC}/user`, {
        credentials: "include",
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          } else {
            await fetch(`${process.env.HOST_API_PUBLIC}/bye`, {
              credentials: "include",
            }).then((res) => {
              if (res.ok) {
                window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isLoading && (
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-[52] flex items-center justify-center bg-white`}
        >
          <div className="animate-bounce">
            <svg
              aria-label="Pinterest"
              height="100"
              role="img"
              viewBox="0 0 24 24"
              width="100"
              className="fill-[#CC0000]"
            >
              <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
            </svg>
          </div>
        </div>
      )}
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
      await fetch(`${process.env.HOST_API_PUBLIC}/user/update_birth/` + birth, {
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
          <div className="flex h-screen w-screen flex-col items-center justify-center bg-white p-5 px-12 text-center md:h-fit md:w-fit md:rounded-[32px]">
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
