/* eslint-disable react/react-in-jsx-scope */
export default function HolidayLanding() {
  return (
    <div
      id="holiday"
      className="snap-center relative h-screen w-screen bg-[#FFE4C1] flex flex-col md:flex-row"
    >
      <div className="w-full  flex flex-col justify-center items-center  mt-[80px]">
        <div className="text-[#C32F00] w-[534px] text-center font-roboto2 font-bold  text-[60px] leading-[71px] break-words">
          Get ready for Thanksgiving
        </div>
        <div className="break-words mt-4  max-w-[534px] leading-7  text-center text-[24px] text-[#C32F00]">
          Find everything from recipes to crafts you can do with the whole
          family.
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
