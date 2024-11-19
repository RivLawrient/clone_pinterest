"use client";

import { useRef } from "react";
import Masonry from "./(Masonry)/masonry";

export default function Home() {
  const images: string[] = [
    "https://i.pinimg.com/236x/14/22/4a/14224ae74db6b2da4db71d707509d073.jpg",
    "https://i.pinimg.com/236x/75/8e/ff/758effaac3ee5a7980ea9195c791756c.jpg",
    "https://i.pinimg.com/736x/68/d1/1f/68d11f4c7945ca82ceaa8e8a58e31c95.jpg",
    "https://i.pinimg.com/474x/d0/fe/4c/d0fe4ce233b0b5b7ba26b70c474ad418.jpg",
    "https://i.pinimg.com/236x/da/48/bc/da48bc5030ac45f3d310289a8d69fb0c.jpg",
    "https://i.pinimg.com/474x/9c/16/bf/9c16bf510deb82fadb576c6da7a86282.jpg",
    "https://i.pinimg.com/236x/9d/a8/24/9da824c644d942d03cc433bf7cf17f41.jpg",
    "https://i.pinimg.com/236x/71/94/f8/7194f86bc86a867576cee5e65ffe4b04.jpg",
    "https://i.pinimg.com/236x/6f/ee/92/6fee92c2e817970bd8888c597276a1bc.jpg",
    "https://i.pinimg.com/236x/24/5c/39/245c397874f122e3e500a09059c09987.jpg",
    "https://i.pinimg.com/236x/e9/f0/21/e9f021b25dd86fcb866124825a1d3285.jpg",
    "https://i.pinimg.com/236x/45/e9/d9/45e9d9cc55e3fd8d4d10fb757779853c.jpg",
    "https://i.pinimg.com/236x/df/c3/96/dfc39602f7e88c9001684273bec2f949.jpg",
    "https://i.pinimg.com/236x/b8/b7/06/b8b706343c8129e428ebaf6264a1336b.jpg",
    "https://i.pinimg.com/236x/44/02/c2/4402c277721e89347632189e55eb1c9b.jpg",
    "https://i.pinimg.com/236x/71/de/14/71de147fdf1264fd1e58913ae3ef953f.jpg",
    "https://i.pinimg.com/474x/94/9b/4a/949b4a6abbc47da3905dd3ce46cac226.jpg",
    "https://i.pinimg.com/474x/de/e7/61/dee761d6746a4caaadfc81bd7dd0b9c8.jpg",
    "https://i.pinimg.com/236x/87/2d/fc/872dfc85fe22fa2b821bc1e7725314db.jpg",
    "https://i.pinimg.com/474x/f1/33/64/f13364d58fe0767ea741b6cd11d17d7a.jpg",
    "https://i.pinimg.com/236x/e7/a5/b2/e7a5b2673cbb5766452e20a8d2253af4.jpg",
    "https://i.pinimg.com/236x/14/22/4a/14224ae74db6b2da4db71d707509d073.jpg",
    "https://i.pinimg.com/236x/75/8e/ff/758effaac3ee5a7980ea9195c791756c.jpg",
    "https://i.pinimg.com/236x/71/94/f8/7194f86bc86a867576cee5e65ffe4b04.jpg",
    "https://i.pinimg.com/736x/68/d1/1f/68d11f4c7945ca82ceaa8e8a58e31c95.jpg",
    "https://i.pinimg.com/736x/6d/eb/9a/6deb9a61f1a2f98fd6bfb604cc3c9521.jpg",
    "https://i.pinimg.com/736x/2a/ed/72/2aed72761ac6352c38cc96d162c044b9.jpg",
    "https://i.pinimg.com/236x/7a/2a/82/7a2a82976fff09ebc9690fa5886be255.jpg",
    "https://i.pinimg.com/236x/c7/20/8c/c7208cf48beb2c253b11ecee199b8103.jpg",
    "https://i.pinimg.com/236x/43/29/5e/43295e295dca08980b032734537ba1f3.jpg",
    "https://i.pinimg.com/236x/0c/20/54/0c205415a23c3f490e05c52efb0baada.jpg",
    "https://i.pinimg.com/236x/21/50/a8/2150a823bf2ffa2024d931633311d9bc.jpg",
    "https://i.pinimg.com/236x/ee/7a/63/ee7a63615f6d219e5af64f9e249dc01d.jpg",
    "https://i.pinimg.com/474x/4b/5f/b6/4b5fb6ac1210546a1d5836438b6cfe1a.jpg",
    "https://i.pinimg.com/236x/d4/60/18/d46018b5dcd5105a158cfa9b24e2f329.jpg",
    "https://i.pinimg.com/236x/ce/24/30/ce24300f7eec823cd9a2278ffb40a3a6.jpg",
    "https://i.pinimg.com/236x/bc/61/35/bc61356eb64b6aa114dabca6550950d0.jpg",
  ];
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref} className="mt-[80px]">
        <Masonry images={images} />
      </div>
    </>
  );
}
