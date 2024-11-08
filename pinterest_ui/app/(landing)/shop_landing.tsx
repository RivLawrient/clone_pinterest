export default function ShopLanding() {
  return (
    <div
      id="shop"
      className="snap-center relative h-screen w-screen bg-[#FFE2EB] flex flex-col md:flex-row"
    >
      <div className="w-full h-full relative">
        <img
          src="https://s.pinimg.com/webapp/shop-de8ddf10.png"
          alt=""
          className="absolute object-cover h-full w-full"
        />
        <div className="absolute bottom-[96px] left-[84px] w-fit">
          <img
            src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
            alt=""
            width={215}
            height={383}
            className=" object-cover rounded-2xl"
          />
          <img
            src="https://s.pinimg.com/webapp/creator-avatar-262dfeba.png"
            alt=""
            width={96}
            className="absolute bottom-[5px] object-cover left-[-36px]"
          />
          <div className="flex flex-col text-white ml-12 mt-1">
            <span className="font-semibold text-[16px] text-nowrap">
              Scout the City
            </span>
            <span className="text-[16px] font-light text-nowrap">
              56.7k followers
            </span>
          </div>
        </div>
      </div>
      <div className="w-full  flex flex-col justify-center items-center  mt-[80px]">
        <div className="text-[#C32F00] w-[420px] text-center font-roboto2 font-bold  text-[60px] leading-[71px] break-words">
          See it, make it, try it, do it
        </div>
        <div className="break-words mt-4  max-w-[420px] leading-7  text-center text-[24px] text-[#C32F00]">
          The best part of Pinterest is discovering new things and ideas from
          people around the world.
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
