"use client";
import { useRef } from "react";
import BottomLanding from "./bottom_landing";
import HeaderLanding from "./header_landing";
import HolidayLanding from "./holiday_landing";
import HomeLanding from "./home_landing";
import SaveLandig from "./save_landing";
import SearchLanding from "./search_landing";
import ShopLanding from "./shop_landing";

export default function Landing() {
  const page: any = useRef();
  const top: any = useRef();
  const scrollToSection = () => {
    page.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollTop = () => {
    top.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <HeaderLanding />
      <div className="h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth break-keep">
        <div ref={top}>
          <HomeLanding scroll={scrollToSection} />
        </div>
        <div ref={page}>
          <SearchLanding />
        </div>
        <SaveLandig />
        <ShopLanding />
        <HolidayLanding />
        <BottomLanding scroll={scrollTop} />
      </div>
    </>
  );
}
