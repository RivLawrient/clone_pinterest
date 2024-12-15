"use client";
import { useUser } from "@/app/(userContext)/User";
import ProfileImage from "../(Component)/profileImage";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Bottom() {
  const { user } = useUser();
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-row justify-around bg-white py-3">
      <Link href={"/"} className={`${path != "/" && "opacity-50"}`}>
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
      <div className={`opacity-50`}>
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
      </div>
      <div className={`opacity-50`}>
        <svg
          aria-label="News notifications and messages"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
        </svg>
      </div>
      <Link
        href={`/${user?.username}`}
        className={`${path != `/${user?.username}` && "opacity-50"}`}
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
