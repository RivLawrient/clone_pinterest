"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../../(userContext)/User";

import DropdownDetail from "./dropdownDetail";
import DropdownNotif from "./dropdownNotif";
import ProfileImage from "../(Component)/profileImage";
import DropDownMsg from "./dropdownMsg";
import { Search } from "./search";

function PageButton({
  destination,
  name,
}: {
  destination: string;
  name: string;
}) {
  const path = usePathname();

  return (
    <Link
      href={`/${destination}`}
      className={`flex h-[48px] cursor-pointer items-center rounded-full px-4 ${path === `/${destination}` ? "bg-black" : "hover:bg-slate-100"}`}
    >
      <span
        className={`text-[16px] tracking-wide ${path === `/${destination}` ? "text-white" : "text-black"}`}
      >
        {name}
      </span>
    </Link>
  );
}

export default function HeaderHome() {
  const { user } = useUser();
  const path = usePathname();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  // const [showNotif, setShowNotif] = useState<boolean>(false);
  const route = useRouter();

  return (
    <>
      {/* <DropdownNotif isVisible={showNotif} setIsVisible={setShowNotif} /> */}
      <DropdownDetail isVisible={showDetail} setIsVisible={setShowDetail} />
      {/* <DropDownMsg isVisible={showMsg} setIsVisible={setShowMsg} /> */}
      <div
        className={`fixed top-0 z-10 hidden h-[80px] w-screen items-center bg-white px-4 py-1 md:flex ${path === "/pin-creation-tool" ? "border border-[#cdcdcd]" : null}`}
      >
        <Link
          href={"/"}
          className="flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100"
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            className="fill-[#CC0000]"
          >
            <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
          </svg>
        </Link>
        <PageButton destination="" name="Home" />
        <PageButton destination="today" name="Explore" />
        <PageButton destination="pin-creation-tool" name="Create" />
        <Search />

        <div
          onClick={() => {
            // setShowNotif(!showNotif);
          }}
          className="flex size-[48px] cursor-not-allowed items-center justify-center rounded-full hover:bg-[#f1f1f1]"
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            className="fill-[#767676]"
          >
            <path d="M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z"></path>
          </svg>
        </div>
        <div
          // onClick={() => setShowMsg(!showMsg)}
          className="flex size-[48px] cursor-not-allowed items-center justify-center rounded-full hover:bg-[#f1f1f1]"
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            className="fill-[#767676]"
          >
            <path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
          </svg>
        </div>
        <div
          onClick={() => route.push("/" + user?.username)}
          className="flex size-[48px] cursor-pointer items-center justify-center rounded-full hover:bg-[#f1f1f1]"
        >
          {user && (
            <ProfileImage
              user={{
                first_name: user.first_name,
                last_name: user.last_name,
                profile_img: user.profile_img,
                username: user.username,
                follow: null,
              }}
              width={24}
            />
          )}
        </div>

        <div
          onClick={() => {
            setShowDetail(!showDetail);
          }}
          className="flex size-[24px] cursor-pointer items-center justify-center rounded-full hover:bg-[#f1f1f1]"
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
            className="fill-[#767676]"
          >
            <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
          </svg>
        </div>
      </div>
    </>
  );
}
