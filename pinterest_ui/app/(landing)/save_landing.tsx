export default function SaveLandig() {
  return (
    <div
      id="save"
      className="snap-center relative h-screen w-screen bg-[#DAFFF6] flex flex-col md:flex-row"
    >
      <div className="w-full  flex flex-col justify-center items-center  mt-[80px]">
        <div className="text-[#006B6C] w-[534px] text-center font-roboto2 font-bold  text-[60px] leading-[71px] break-words">
          Save ideas you like
        </div>
        <div className="break-words mt-4  max-w-[375px] leading-7  text-center text-[24px] text-[#006B6C]">
          Collect your favorites so you can get back to them later.
        </div>
        <div>
          <div className="mt-6 mb-12 bg-[#E60032] px-4 py-3 text-[16px] text-white font-roboto1 rounded-full">
            Explore
          </div>
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
}
