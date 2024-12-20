import BottomLanding from "./bottom_landing";
import HeaderLanding from "./header_landing";
import HolidayLanding from "./holiday_landing";
import HomeLanding from "./home_landing";
import SaveLandig from "./save_landing";
import SearchLanding from "./search_landing";
import ShopLanding from "./shop_landing";

export default function Landing() {
  return (
    <>
      <HeaderLanding />
      <div className="fixed h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth break-keep">
        <HomeLanding />
        <SearchLanding />
        <SaveLandig />
        <ShopLanding />
        {/* <HolidayLanding /> */}
        <BottomLanding />
      </div>
    </>
  );
}
