"use client";
import { useUser } from "@/app/(userContext)/User";
import ProfileImage from "../(Component)/profileImage";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Bottom() {
  const { user } = useUser();
  const path = usePathname();

  return (
    <div
      className={`${path.startsWith("/pin/") ? "hidden" : "fixed"} bottom-0 left-0 right-0 z-10 flex flex-row justify-around bg-white py-3`}
    >
      <Link
        href={"/"}
        className={`${path != "/" && "opacity-50"} flex size-[36px] items-center justify-center rounded-full`}
      >
        <svg
          aria-label="Home"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M12 0 1 10v14h8v-7a3 3 0 1 1 6 0v7h8V10z"></path>
        </svg>
      </Link>
      <Link
        href={"/search"}
        className={`flex size-[36px] items-center justify-center rounded-full ${path != "/search" && "opacity-50"}`}
      >
        {" "}
        <svg
          aria-label="Search"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path>
        </svg>
      </Link>

      <Link
        href={"/pin-creation-tool"}
        className={`flex size-[36px] items-center justify-center rounded-full ${path != "/pin-creation-tool" && "opacity-50"}`}
      >
        {" "}
        <svg
          aria-hidden="true"
          aria-label=""
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
        </svg>
      </Link>

      <Link
        href={"/notification"}
        className={`flex size-[36px] items-center justify-center rounded-full ${path != "/notification" && "opacity-50"}`}
      >
        <svg
          aria-label="News notifications and messages"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
        </svg>
      </Link>
      <Link
        href={`/${user?.username}`}
        className={`${path != `/${user?.username}` && "opacity-50"} flex size-[36px] items-center justify-center rounded-full`}
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
      </Link>
    </div>
  );
}
