"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ListUser, Search } from "../(Header)/search";
import { useUser } from "@/app/(userContext)/User";
import { User } from "../(postContext)/Post";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listUser, setListUser] = useState<User[]>([]);

  return (
    <div className="flex w-screen justify-center md:h-screen md:items-center">
      <span className="hidden md:block">there isn't any yet</span>
      <div className="block w-full pt-2 md:hidden">
        <SearchInput
          setListUser={setListUser}
          search={search}
          setSearch={setSearch}
          setIsLoading={setIsLoading}
        />
        {!search ? (
          <div className="flex w-screen justify-center">
            <span className="my-20 text-[16px] font-semibold">
              Can only search for other users
            </span>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex w-full justify-center py-3">LOADING...</div>
            ) : listUser && listUser.length > 0 ? (
              listUser.map((value, index) => (
                <ListUser user={value} key={index} />
              ))
            ) : (
              <div className="flex w-full justify-center py-3">Not Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchInput({
  setListUser,
  search,
  setSearch,
  setIsLoading,
}: {
  setListUser: Dispatch<SetStateAction<User[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const GetData = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsLoading(true);
    await fetch(
      `${process.env.HOST_API_PUBLIC}/users/${e.target.value.toLocaleLowerCase()}`,
      {
        method: "GET",
      },
    )
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setListUser(data.data);
        } else {
          setListUser([]);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

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
        onChange={GetData}
        className="w-full border-none bg-transparent outline-none placeholder:text-nowrap placeholder:text-[16px] placeholder:text-[#767676]"
      />
    </div>
  );
}
