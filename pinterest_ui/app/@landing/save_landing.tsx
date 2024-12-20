export default function SaveLandig() {
  return (
    <div className="relative z-[1] flex h-screen w-screen snap-center flex-col-reverse items-center bg-[#DAFFF6] md:flex-row">
      <div
        className={`flex basis-1/2 flex-col items-center justify-center md:mt-20`}
      >
        <div
          className={`text-center text-[28px] font-bold text-[#006B6C] md:text-[60px] md:leading-[71px]`}
        >
          Save ideas you like
        </div>
        <div
          className={`mt-2 max-w-[290px] break-words text-center text-[#006B6C] text-[16] md:mt-4 md:max-w-[400px] md:text-[24px] md:leading-7`}
        >
          Collect your favorites so you can get back to them later.
        </div>
        <div>
          <div
            className={`mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 text-[16px] text-white`}
          >
            Explore
          </div>
        </div>
      </div>
      <div className={`flex basis-1/2 items-center justify-center md:mt-20`}>
        <div
          className={`relative h-[450px] w-[375px] md:h-[695px] md:w-[687px]`}
        >
          <img
            src="https://s.pinimg.com/webapp/future-home-vibes-adb19e98.png"
            alt=""
            className={`absolute left-[20px] top-[15px] w-[201px] md:left-[10px] md:top-0 md:w-[400px]`}
          />
          <img
            src="https://s.pinimg.com/webapp/scandinavian-bedroom-696dfba5.png"
            alt=""
            className={`absolute right-[-6px] top-[38px] w-[114px] md:left-[464px] md:top-0 md:w-[223px]`}
          />
          <img
            src="https://s.pinimg.com/webapp/deck-of-dreams-205a139e.png"
            alt=""
            className={`absolute right-[38px] top-[168px] w-[85px] md:left-[447px] md:top-[280px] md:w-[165px]`}
          />
          <img
            src="https://s.pinimg.com/webapp/bathroom-upgrade-02599fd4.png"
            alt=""
            className={`absolute right-[40px] top-[283px] w-[105px] md:left-[429px] md:top-[500px] md:w-[223px]`}
          />
          <img
            src="https://s.pinimg.com/webapp/serve-my-drinks-4de83489.png"
            alt=""
            className={`absolute bottom-[5%] left-[97px] w-[105px] md:left-[159px] md:top-[460px] md:w-[223px]`}
          />
        </div>
      </div>
    </div>
  );
}
