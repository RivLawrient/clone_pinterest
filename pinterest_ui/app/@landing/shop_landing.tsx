export default function ShopLanding() {
  return (
    <div className="relative flex h-screen w-screen snap-center flex-col items-center bg-[#FFE2EB] md:flex-row">
      <div
        style={{
          backgroundImage: `url(https://s.pinimg.com/webapp/shop-de8ddf10.png)`,
        }}
        className={`relative flex h-full w-full basis-3/5 items-center justify-center bg-cover bg-center md:basis-1/2`}
      >
        <div className="absolute bottom-[96px] left-[84px] w-[150px] md:w-fit">
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
            width={77}
            className="absolute bottom-[5px] left-[-36px] object-cover"
          />
          <div className="ml-10 mt-1 flex flex-col leading-none text-white md:ml-12">
            <span className="text-nowrap text-[16px] font-semibold">
              Scout the City
            </span>
            <span className="text-nowrap text-[16px] font-light">
              56.7k followers
            </span>
          </div>
        </div>
      </div>
      <div
        className={`flex basis-2/5 flex-col items-center justify-center md:mt-20 md:basis-1/2`}
      >
        <div
          className={`w-[300px] text-center text-[28px] font-bold text-[#C32F00] md:w-[420px] md:text-[60px] md:leading-[71px]`}
        >
          See it, make it, try it, do it
        </div>
        <div
          className={`mt-2 w-[300px] max-w-[290px] break-words text-center text-[#C32F00] text-[16] md:mt-4 md:max-w-[420px] md:text-[24px] md:leading-7`}
        >
          The best part of Pinterest is discovering new things and ideas from
          people around the world..
        </div>
        <div>
          <div
            className={`mb-12 mt-6 rounded-full bg-[#E60032] px-4 py-3 text-[16px] text-white`}
          >
            Explore
          </div>
        </div>
      </div>
    </div>
  );
}
