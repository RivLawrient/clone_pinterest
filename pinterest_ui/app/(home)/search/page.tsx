"use client";
import { useState } from "react";
import { ListUser, Search } from "../(Header)/search";
import { useUser } from "@/app/(userContext)/User";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const { user } = useUser();

  return (
    <div className="flex h-screen w-screen justify-center md:items-center">
      <span className="hidden md:block">there isn't any yet</span>
      <div className="block w-full pt-2 md:hidden">
        <SearchInput search={search} setSearch={setSearch} />
        {!search ? (
          <div className="flex h-screen w-screen justify-center">
            <span className="my-20 text-[16px] font-semibold">
              Can only search for other users
            </span>
          </div>
        ) : (
          <div>
            <ListUser
              user={{
                username: user?.username || "",
                first_name: user?.first_name || "",
                last_name: user?.last_name || "",
                profile_img: user?.profile_img || "",
                follow: null,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SearchInput({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      onMouseDown={(e) => console.log("apa")}
      className="mx-2 flex h-[48px] grow items-center rounded-full bg-[#f1f1f1] px-4 hover:bg-[#e1e1e1]"
    >
      <svg
        aria-label="Search icon"
        height="16"
        role="img"
        viewBox="0 0 24 24"
        width="16"
        className="mr-2 fill-[#767676]"
      >
        <path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path>
      </svg>
      <input
        type="text"
        value={search}
        placeholder="Search for"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-none bg-transparent outline-none placeholder:text-nowrap placeholder:text-[16px] placeholder:text-[#767676]"
      />
    </div>
  );
}
