export default function ShopLanding() {
  return (
    <div className="relative flex h-screen w-screen snap-center flex-col bg-[#FFE2EB] md:flex-row">
      <div className="relative h-full w-full">
        <img
          src="https://s.pinimg.com/webapp/shop-de8ddf10.png"
          alt=""
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute bottom-[96px] left-[84px] w-fit">
          <img
            src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
            alt=""
            width={215}
            height={383}
            className="rounded-2xl object-cover"
          />
          <img
            src="https://s.pinimg.com/webapp/creator-avatar-262dfeba.png"
            alt=""
            width={96}
            className="absolute bottom-[5px] left-[-36px] object-cover"
          />
          <div className="ml-12 mt-1 flex flex-col text-white">
            <span className="text-nowrap text-[16px] font-semibold">
              Scout the City
            </span>
            <span className="text-nowrap text-[16px] font-light">
              56.7k followers
            </span>
          </div>
        </div>
      </div>
      <div className="mt-[80px] flex w-full flex-col items-center justify-center">
        <div className="w-[420px] break-words text-center font-roboto2 text-[60px] font-bold leading-[71px] text-[#C32F00]">
          See it, make it, try it, do it
        </div>
        <div className="mt-4 max-w-[420px] break-words text-center text-[24px] leading-7 text-[#C32F00]">
          The best part of Pinterest is discovering new things and ideas from
          people around the world.
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
