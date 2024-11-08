export default function SearchLanding() {
  return (
    <div
      id="search"
      className="snap-center relative h-screen w-screen scroll-smooth bg-[#FFFD92] flex flex-col md:flex-row"
    >
      <div className="w-full h-full">
        <div className=" flex justify-center items-center h-full w-full">
          <div className="h-[611px] w-[537px] relative">
            <img
              src="https://s.pinimg.com/webapp/topRight-6902088a.png"
              alt=""
              width={178}
              className="object-cover absolute top-0 right-[15px]"
            />
            <img
              src="https://s.pinimg.com/webapp/left-ccce7532.png"
              alt=""
              width={204}
              className="object-cover absolute top-[150px] left-0"
            />
            <img
              src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
              alt=""
              width={164}
              className="object-cover absolute right-0 bottom-0"
            />
            <img
              src="https://s.pinimg.com/webapp/center-2d76a691.png"
              alt=""
              width={298}
              className="object-cover absolute top-[88px] left-[148px]"
            />
            <div className="absolute flex h-[100px] justify-center bg-white items-center w-[316px] rounded-full top-[231px] left-[103px]">
              <svg
                aria-label="search"
                className="fill-black ml-2"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M10 16a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16m13.12 2.88-4.26-4.26a10 10 0 1 0-4.24 4.24l4.26 4.26a3 3 0 1 0 4.24-4.24"></path>
              </svg>
              <div className="text-[24px] mx-2 text-[#6E0F3C] font-bold font-roboto">
                easy chicken dinner
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  flex flex-col justify-center items-center  mt-[80px]">
        <div className="text-[#C31952] font-roboto2 font-bold  text-[60px] leading-[71px]">
          Search for an idea
        </div>
        <div className="break-words mt-4  max-w-[400px] leading-7  text-center text-[24px] text-[#C31952]">
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </div>
        <div>
          <div className="mt-6 mb-12 bg-[#E60032] px-4 py-3 text-[16px] text-white font-roboto1 rounded-full">
            Explore
          </div>
        </div>
      </div>
    </div>
  );
}
