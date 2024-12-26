import { useEffect, useRef, useState } from "react";
import { User } from "../(postContext)/Post";
import Link from "next/link";
import { useUser } from "@/app/(userContext)/User";
import ProfileImage from "../(Component)/profileImage";

export function Search() {
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFocus(false);
      }
    };

    if (focus) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFocus, focus]);

  const [listUser, setListUser] = useState<User[]>([]);

  const GetData = async (e) => {
    setSearch(e.target.value);
    await fetch(`${process.env.HOST_API_PUBLIC}/users/${e.target.value}`, {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setListUser(data.data);
        } else {
        }
      })
      .catch(() => {});
  };

  return (
    <>
      <div
        ref={ref}
        onMouseDown={(e) => console.log("apa")}
        className="relative mx-2 flex h-[48px] grow items-center rounded-full bg-[#f1f1f1] px-4 hover:bg-[#e1e1e1]"
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
          onFocus={(e) => setFocus(true)}
          onChange={GetData}
          className="w-full border-none bg-transparent outline-none placeholder:text-nowrap placeholder:text-[16px] placeholder:text-[#767676]"
        />
        <ContentSearch
          list={listUser}
          focus={focus}
          setFocus={setFocus}
          search={search}
          setSearch={setSearch}
        />
      </div>
      {focus && (
        <div className="fixed bottom-0 left-0 right-0 top-20 -z-50 bg-black/30"></div>
      )}
    </>
  );
}

function ContentSearch({
  list,
  focus,
  setFocus,
  search,
  setSearch,
}: {
  list: User[];
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      {focus && (
        <div className="absolute left-0 right-0 top-12 flex h-[400px] origin-top justify-center rounded-b-2xl bg-white">
          {!search ? (
            <span className="my-20 text-[16px] font-semibold">
              Can only search for other users
            </span>
          ) : (
            <div
              onClick={() => {
                setSearch("");
                setFocus(false);
              }}
              className="flex w-full flex-col justify-start py-8"
            >
              {list.map((value, index) => (
                <ListUser user={value} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function ListUser({ user }: { user: User }) {
  return (
    <Link
      href={`/${user.username}`}
      className="grid h-fit w-full grid-cols-[fit-content(40px)_1fr] items-center gap-2 px-3 py-1 hover:bg-gray-200"
    >
      <ProfileImage user={user} width={40} />
      <div>
        <div className="text-[16px] font-semibold">
          {user.first_name} {user.last_name}
        </div>
        <div className="text-[12px]">{user.username}</div>
      </div>
    </Link>
  );
}
