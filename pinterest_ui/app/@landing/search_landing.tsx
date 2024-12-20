export default function SearchLanding() {
  return (
    <div className="search-section relative flex h-screen w-screen snap-center flex-col items-center scroll-smooth bg-[#FFFD92] md:flex-row">
      <div className={`flex basis-1/2 items-center justify-center md:mt-20`}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-[325px] w-[300px] items-center md:h-[611px] md:w-[537px]">
            <img
              src="https://s.pinimg.com/webapp/topRight-6902088a.png"
              alt=""
              className="absolute right-[10%] top-[12.5%] w-[87px] object-cover md:right-[15px] md:top-0 md:w-[178px]"
            />
            <img
              src="https://s.pinimg.com/webapp/left-ccce7532.png"
              alt=""
              className="absolute left-0 top-[35%] w-[100px] object-cover md:left-0 md:top-[150px] md:w-[204px]"
            />
            <img
              src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
              alt=""
              className="absolute bottom-0 right-[10%] w-[80px] object-cover md:bottom-0 md:right-0 md:w-[164px]"
            />
            <img
              src="https://s.pinimg.com/webapp/center-2d76a691.png"
              alt=""
              className="absolute left-[25%] top-[25%] w-[146px] object-cover md:left-[148px] md:top-[88px] md:w-[298px]"
            />
            <div className="md:h- absolute left-[15%] top-[50%] flex h-[50px] w-[198px] items-center justify-center rounded-full bg-white md:left-[103px] md:top-[231px] md:h-[100px] md:w-[316px]">
              <svg
                aria-label="search"
                className="ml-2 size-[14px] fill-black md:size-[24px]"
                role="img"
                viewBox="0 0 24 24"
              >
                <path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path>
              </svg>
              <div className="mx-2 font-roboto text-[14px] font-bold text-[#6E0F3C] md:text-[24px]">
                easy chicken dinner
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex basis-1/2 flex-col items-center justify-center md:mt-20`}
      >
        <div
          className={`text-center text-[28px] font-bold text-[#C31952] md:text-[60px] md:leading-[71px]`}
        >
          Search for an idea
        </div>
        <div
          className={`mt-2 max-w-[290px] break-words text-center text-[#C31952] text-[16] md:mt-4 md:max-w-[400px] md:text-[24px] md:leading-7`}
        >
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </div>
        <div>
          <div
            className={`mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 text-[16px] text-white`}
          >
            Explore
          </div>
        </div>
      </div>
      {/* <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-[325px] w-[300px] items-center md:h-[611px] md:w-[537px]">
            <img
              src="https://s.pinimg.com/webapp/topRight-6902088a.png"
              alt=""
              width={178}
              className="absolute right-[15px] top-0 object-cover"
            />
            <img
              src="https://s.pinimg.com/webapp/left-ccce7532.png"
              alt=""
              width={204}
              className="absolute left-0 top-[150px] object-cover"
            />
            <img
              src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
              alt=""
              width={164}
              className="absolute bottom-0 right-0 object-cover"
            />
            <img
              src="https://s.pinimg.com/webapp/center-2d76a691.png"
              alt=""
              width={298}
              className="absolute left-[148px] top-[88px] object-cover"
            />
            <div className="absolute left-[103px] top-[231px] flex h-[100px] w-[316px] items-center justify-center rounded-full bg-white">
              <svg
                aria-label="search"
                className="ml-2 fill-black"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path>
              </svg>
              <div className="mx-2 font-roboto text-[24px] font-bold text-[#6E0F3C]">
                easy chicken dinner
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[80px] flex w-full flex-col items-center justify-center">
        <div className="text-center font-roboto2 text-[28px] font-bold leading-[71px] text-[#C31952] md:text-[60px]">
          Search for an idea
        </div>
        <div className="mt-2 max-w-[400px] break-words text-center leading-7 text-[#C31952] text-[16] md:mt-4 md:text-[24px]">
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </div>
        <div>
          <div className="mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 font-roboto1 text-[16px] text-white">
            Explore
          </div>
        </div>
      </div> */}
    </div>
  );
}
