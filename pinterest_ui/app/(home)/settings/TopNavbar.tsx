import { useRouter } from "next/navigation";
import { Btn } from "./Btn";

export function TopNavbar() {
  const router = useRouter();
  return (
    <div className="fixed top-0 flex w-screen items-center justify-between bg-white px-3 py-4 md:hidden">
      <div
        onClick={() => router.back()}
        className="flex size-[32px] items-center justify-center"
      >
        <svg
          aria-hidden="true"
          aria-label=""
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M15.78 24a2.2 2.2 0 0 1-1.58-.66L3 12 14.2.66a2.2 2.2 0 0 1 3.15 0c.87.88.87 2.3 0 3.18L9.29 12l8.06 8.16c.87.88.87 2.3 0 3.18-.44.44-1 .66-1.57.66"></path>
        </svg>
      </div>
      <span className="text-[20px] font-semibold">Edit profile</span>
      <Btn disabled={true} text="Done" />
    </div>
  );
}
