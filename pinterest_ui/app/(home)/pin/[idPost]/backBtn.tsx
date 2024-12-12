import { useRouter } from "next/navigation";

export function BackBtn() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={`fixed left-0 z-[4] m-2 flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-slate-50 bg-opacity-40 hover:bg-slate-100 active:bg-slate-200`}
    >
      <svg
        aria-hidden="true"
        aria-label=""
        height="19"
        role="img"
        viewBox="-1 0 24 24"
        width="19"
      >
        <path d="M7.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
    </div>
  );
}
