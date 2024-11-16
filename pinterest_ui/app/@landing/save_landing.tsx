export default function SaveLandig() {
  return (
    <div
      // id="save"
      className="relative flex h-screen w-screen snap-center flex-col bg-[#DAFFF6] md:flex-row"
    >
      <div className="mt-[80px] flex w-full flex-col items-center justify-center">
        <div className="w-[534px] break-words text-center font-roboto2 text-[60px] font-bold leading-[71px] text-[#006B6C]">
          Save ideas you like
        </div>
        <div className="mt-4 max-w-[375px] break-words text-center text-[24px] leading-7 text-[#006B6C]">
          Collect your favorites so you can get back to them later.
        </div>
        <div>
          <div className="mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 font-roboto1 text-[16px] text-white">
            Explore
          </div>
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
}
