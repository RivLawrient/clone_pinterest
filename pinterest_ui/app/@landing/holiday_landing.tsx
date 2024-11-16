/* eslint-disable react/react-in-jsx-scope */
export default function HolidayLanding() {
  return (
    <div
      // id="holiday"
      className="relative flex h-screen w-screen snap-center flex-col bg-[#FFE4C1] md:flex-row"
    >
      <div className="mt-[80px] flex w-full flex-col items-center justify-center">
        <div className="w-[534px] break-words text-center font-roboto2 text-[60px] font-bold leading-[71px] text-[#C32F00]">
          Get ready for Thanksgiving
        </div>
        <div className="mt-4 max-w-[534px] break-words text-center text-[24px] leading-7 text-[#C32F00]">
          Find everything from recipes to crafts you can do with the whole
          family.
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
