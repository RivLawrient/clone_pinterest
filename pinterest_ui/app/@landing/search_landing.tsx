export default function SearchLanding() {
  return (
    <div
      // id="search"
      className="relative flex h-screen w-screen snap-center flex-col scroll-smooth bg-[#FFFD92] md:flex-row"
    >
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-[611px] w-[537px]">
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
        <div className="font-roboto2 text-[60px] font-bold leading-[71px] text-[#C31952]">
          Search for an idea
        </div>
        <div className="mt-4 max-w-[400px] break-words text-center text-[24px] leading-7 text-[#C31952]">
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </div>
        <div>
          <div className="mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 font-roboto1 text-[16px] text-white">
            Explore
          </div>
        </div>
      </div>
    </div>
  );
}
