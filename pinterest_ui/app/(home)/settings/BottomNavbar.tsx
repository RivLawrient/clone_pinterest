import { Btn } from "./Btn";

export function BottomNavbar() {
  return (
    <div className="fixed bottom-0 hidden w-screen flex-row bg-white shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px] md:flex">
      <div className="flex justify-end gap-2 py-4 md:basis-2/3 lg:basis-1/2">
        <Btn text="Save" />
      </div>
    </div>
  );
}
