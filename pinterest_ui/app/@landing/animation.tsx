"use client";

import React, { useEffect, useState } from "react";

export function AnimateText({ step }: { step: number }) {
  const texts = [
    "weeknight dinner idea",
    "home decor idea",
    "new look outfit",
    "green thumb idea",
    "",
  ];
  const color: string[] = [
    "text-[#C28B00]",
    "text-[#618C7B]",
    "text-[#0076D3]",
    "text-[#618C7B]",
    "",
  ];

  return (
    <div className="z-30 hidden w-full justify-center md:flex">
      {texts.map((value: string, index: number) => (
        <div
          key={index}
          className={` ${
            step === index ? "animate-img" : ""
          } absolute text-nowrap font-roboto2 text-[60px] opacity-0 ${
            color[index]
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export function AnimateBtn({
  step,
  setTranslate,
}: {
  step: number;
  setTranslate: React.Dispatch<React.SetStateAction<number>>;
}) {
  const color: string[] = [
    "bg-[#C28B00]",
    "bg-[#618C7B]",
    "bg-[#0076D3]",
    "bg-[#618C7B]",
    "bg-[#618C7B]",
  ];

  return (
    <div
      onClick={() => {
        // document
        //   .querySelector(".search-section")
        //   ?.scrollIntoView({ behavior: "smooth" })
        console.log(window.innerHeight);
        setTranslate(window.innerHeight);
      }}
      className={`hidden size-[48px] animate-bounce ${color[step]} z-20 mb-[16px] cursor-pointer items-center justify-center rounded-full md:flex`}
    >
      <svg
        aria-label="Scroll down"
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
        className="fill-white"
      >
        <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
      </svg>
    </div>
  );
}

export function AnimateImg({ step }: { step: number }) {
  const link = "/img/";
  const images = [
    [
      `${link}e3414b2fcf00375a199ba6964be551af.jpg`,
      `${link}786e00eab219eca59803d118fbe0feb3.jpg`,
      `${link}3b42b02bf047097582b26401df90cdb3.jpg`,
      `${link}de136b0fa0037d3453a430895d8a5c27.jpg`,
      `${link}15bf41a80a0ffb41cc9d0fd98abed34b.jpg`,
      `${link}c457bd9496170bfa3845b7cee775df65.jpg`,
      `${link}05652045e57af33599557db9f23188c0.jpg`,
      `${link}c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg`,
      `${link}9443b93bd8773fec91bc1837e8424e8e.jpg`,
      `${link}e68a42c2e530fbdf6b3ab2f379dcd384.jpg`,
      `${link}95f373590dad79bcf3202ce6edad5bcd.jpg`,
      `${link}e7c6c65c6e38f43d4b979d3cb1e46bf7.jpg`,
      `${link}fb18deb4959e9a0678e1bf99105ea775.jpg`,
      `${link}c561c2a77d5b9b03702efc423b18cb9a.jpg`,
      `${link}64cf2184d33446c4cf1cc8c3c585b9f4.jpg`,
      `${link}06e814c8c5c82b9bf794add896616e12.jpg`,
      `${link}62bb9727b2e09751d43c32589c503b39.jpg`,
      `${link}a9f90926afdfbff79f6d2a017c8e19dd.jpg`,
      `${link}962cce1d513d665ecca6eb733a90a160.jpg`,
      `${link}af609e357a691876ac58d02e27af316e.jpg`,
      `${link}d55f97078c0d7b60b758cac3b34114c9.jpg`,
      `${link}2245e261944f1eae080423f6ff7805e1--romantic-picnics-romantic-ideas.jpg`,
      `${link}65dfcdd2fc433d45baedb3666cacfd82.jpg`,
      `${link}2877f4e254c0bd27ac4f4c5d8a43404f.jpg`,
      `${link}8b21b0133442afd03d2c5e9a998c96b3.jpg`,
      `${link}489cd9ae5fec17977c73677866202d59.jpg`,
      `${link}14730af41a58e05384b86b0bacf9d57b.jpg`,
      `${link}1636dd650e6289cd0ec4f4f06dea7835--british-recipes-the-great-british-bake-off-recipes.jpg`,
      `${link}dafe1e26613892b2bc26508b33de353d.jpg`,
      `${link}f39c11819b48bf4dc34fa1670fb1fef6.jpg`,
      `${link}d432cdc35cf6cc5c7ec07a5036a87bca.jpg`,
      `${link}c1d07f45a5c2b121255ba9ec54b9adf7.jpg`,
      `${link}18dcf759aa96740f8d335dc6231a9cf9.jpg`,
      `${link}633ec1128e0b7ed911c462cb89620c64.jpg`,
      `${link}4fdf820192314371138c0f4f999cdddc.jpg`,
    ],
    [
      `${link}28858cedb11e772b00edd867009c5e88.jpg`,
      `${link}4257161f841b16b62c3aa92d881a9e8d.jpg`,
      `${link}f48eca8c68ffb9e72ab74627c3597ce9--best-bathrooms-small-bathrooms.jpg`,
      `${link}3f479578058904cca0a0e8d693045459.jpg`,
      `${link}6f25cc5393793930bf9b7106f55c89cf.jpg`,
      `${link}a47c6eff8a1b1d5e92f8985cb6aed67d.jpg`,
      `${link}ae91abd87cc085d894a44f6b34c8129c.jpg`,
      `${link}d2d41273edca79dae8db151aa28f77d5--blue-grey-bathrooms-tile-bathrooms.jpg`,
      `${link}e34312fc1c469f1e4847282160eabe18.jpg`,
      `${link}b99bacfed714e9fafd218c503bf2f300.jpg`,
      `${link}c35fcaff9941bce718cf9f4de3f33f57.jpg`,
      `${link}f0da949d68d13c22fc2082eb33f77b0f.jpg`,
      `${link}626c70231c0ef5f21a54737a928c65b0.jpg`,
      `${link}28ab8205553272aa751e237165ea897a.jpg`,
      `${link}a7f2614d15753b9c1385ae34391510df.jpg`,
      `${link}caee6fb84a927407fd03e9f499ecaae2.jpg`,
      `${link}d3fb6973cddc1d875dc7c2e04525d2e7.jpg`,
      `${link}f55d6493be57f90310d15b5e1a20c682.jpg`,
      `${link}6690982410d9194543c1ffbf13fbb60b.jpg`,
      `${link}e6512b773ee1e141408b3ca47dce92d6.jpg`,
      `${link}223a4015ad7e274eb928024d4aa59f95.jpg`,
      `${link}a3b65f745a80671af4312b275c06c27e.jpg`,
      `${link}ca6b0cc45aa9d33143b67a09ed75959a.jpg`,
      `${link}8779c6f5ccdff8cbdedef7851b7d3682.jpg`,
      `${link}5174594f50a3e50880fb5c32394e45e3.jpg`,
      `${link}f89730229686d12c34f5a5a500aaebcd.jpg`,
      `${link}b11b310559340fbd1b7777f806a418a9.jpg`,
      `${link}b74504c09af83f71e8af41abc6f29732.jpg`,
      `${link}e335ecf9ba6ce14dc40b52d2721d2215.jpg`,
      `${link}492def5c84b3fbf6a7a0292e712ae007.jpg`,
      `${link}eed3dca79abceab30f836d2db806c0e1.jpg`,
      `${link}188a6f3c7c25901023cd7c564281a40c.jpg`,
      `${link}2ce06d9926b65f60dc4ae9eff1a13c7f.jpg`,
      `${link}dc637c7b497b00a4b097bdbe62184fa1.jpg`,
      `${link}fefea57d65ac52136f2e55a13e1ad17f.jpg`,
    ],
    [
      `${link}7ae3370edba908ba0df9469d5d6133b0.jpg`,
      `${link}d23fc8dd63c85874f8e12fd79c9662e1.jpg`,
      `${link}a110e1bc0897daf7fb10ee75c0d25639.jpg`,
      `${link}868e5698a3cd46d753459ff448ab6c16.jpg`,
      `${link}8130fcdd4cac0a958df25b4a71a96f35.jpg`,
      `${link}b8ac51e8e5d9de70114f431574907072.jpg`,
      `${link}7c4f3961236c4914b25a7ec06f8e08e2.jpg`,
      `${link}3d40c99ac6cbb6cd441a1b5fb20cd459.jpg`,
      `${link}c784cfe161c81737cdf2b0f1cfd892cd.jpg`,
      `${link}b9549f80f3a7dbc5a11a4851c1c076b7.jpg`,
      `${link}4792b7bdc6bb8d59304f23d7ac6d109a.jpg`,
      `${link}92426d84cd455d958db778d54a94fd00.jpg`,
      `${link}28cc1f5464d7ba55a56e05ee85707dbc.jpg`,
      `${link}1c4e22bc826843b92969d00d3bec53b9.jpg`,
      `${link}85a21aea41cdecdb2de94e16f50db7d0.jpg`,
      `${link}3f052c9b0f402d3373b9e0916c53bac7.jpg`,
      `${link}b14433a316a98aa75c4f12b0910ad549.jpg`,
      `${link}2595e04c8dd984d89d28db0957a76d1d.jpg`,
      `${link}c5bc21a1fc21b6015acf43f0a939c833.jpg`,
      `${link}85c562e7f72b6cccaa3f09399077bc22.jpg`,
      `${link}812026f8ac451726e00f05c7ebed409a.jpg`,
      `${link}c71183098d2198cd9006e939b7ec3afb.jpg`,
      `${link}3029453a4d74034d64beb8f6021ce710.jpg`,
      `${link}688fb1db4da88f6c6749249e8d2b3734.jpg`,
      `${link}98fdd7f1ecc1c8935ccf39d2aac81f09.jpg`,
      `${link}ec3d16a602038f70dba288bc00ec7e37.jpg`,
      `${link}a70284853f4e02c9038123ea77fd0186.jpg`,
      `${link}8c2ba8d19852209a6ab8f69e097ff278.jpg`,
      `${link}1b8b52de400ad51e36af7217d2347a83.jpg`,
      `${link}672f7160ee2b9130ac177fb3ed975213.jpg`,
      `${link}bf363a930744d78f467787241198e51a.jpg`,
      `${link}b944727d606e5429bd1774790ef79353.jpg`,
      `${link}a0a05cc39b3668ec4b07b58ced608dac.jpg`,
      `${link}83ac64291afee7c00c3b2d3bec6c79e0.jpg`,
      `${link}8ca85fd7930a2d8e180f9b229341d2c6.jpg`,
    ],
    [
      `${link}d3fb6973cddc1d875dc7c2e04525d2e7.jpg`,
      `${link}0184cafdc51049a7d1cc9df88e87db18.jpg`,
      `${link}8278857ebd0192658d565a968a7df1cc.jpg`,
      `${link}c6404d3c1ed97ca0360e0cb634fef9ac.jpg`,
      `${link}22ab69682a7e4b2915e747b711bcc4fc.jpg`,
      `${link}a78720c39a39ac50a2856420d636d113.jpg`,
      `${link}5197905f29a3bf796150506e12cb234c.jpg`,
      `${link}9e422240981aebcbe435c05c26f4bec3.jpg`,
      `${link}fa857720e454dd729417920b187493e2.jpg`,
      `${link}7997d893274f6359839d6fe72b1892d6.jpg`,
      `${link}f113df475d4566caa0075c6729960fa3.jpg`,
      `${link}fa857720e454dd729417920b187493e2.jpg`,
      `${link}52a3d167e25b31783c49d629294a3c35.jpg`,
      `${link}6af67110eb902f81523fae20e7220179.jpg`,
      `${link}330619f00ec91194d49140f4630340fe.jpg`,
      `${link}719a84fd80e49047407371ef9b3c224d.jpg`,
      `${link}9b529dd5d75523e9a6bf29dbf09f404a.jpg`,
      `${link}5770c654b38898b9a2aaf27973576f35.jpg`,
      `${link}b76cfb380344cf5b45ad4696b6f5541b.jpg`,
      `${link}d3df973696928fd387a4bbb1745eddf9.jpg`,
      `${link}f4dc58f3bddf1c5b5249511820246df8.jpg`,
      `${link}509e3ac9af5c305e83eddc25b748214b.jpg`,
      `${link}a808b697d728434d944a5d99abdbcb13.jpg`,
      `${link}be7c18ae62b7837e94fb819dfdf38fa2.jpg`,
      `${link}f4dc58f3bddf1c5b5249511820246df8.jpg`,
      `${link}8805128eef83a0d8b724567611ddf7a1.jpg`,
      `${link}61be0fd258626af4deab36336b9abd94.jpg`,
      `${link}47f43e7f2b1bd7e6596e47cc781c7799.jpg`,
      `${link}d3efea44c1c69838dac154f0555adb05.jpg`,
      `${link}6aea1c0bc96840a03644ed7b460fac9e.jpg`,
      `${link}6a77ed2962aa7e66bac8ff727d939e96.jpg`,
      `${link}4abf5134ee423d583ce03707a166c16e.jpg`,
      `${link}7fc81ec2166365721b8fd0d2f875671d.jpg`,
      `${link}31fc438686df6b34e2544865d0c111a3.jpg`,
      `${link}9e422240981aebcbe435c05c26f4bec3.jpg`,
    ],
  ];

  const [current, setCurrent] = useState<number[]>([-1, -1, -1, -1]);

  useEffect(() => {
    for (let i = 0; i <= 35; i++) {
      setTimeout(() => {
        setCurrent((prev: number[]) =>
          prev.map((v: number, index: number) => (index === step ? i - 1 : v)),
        );
      }, 50 * i);
    }
  }, [step]);

  return (
    <div className="flex w-full justify-center">
      {images.map((values: string[], indexs: number) => (
        <div
          key={indexs}
          className="absolute w-fit columns-7 gap-3 pt-[20px] md:pt-0"
        >
          {values.map((imageUrl: string, index: number) => (
            <React.Fragment key={index}>
              <div
                className={`mb-3 hidden min-w-[236px] max-w-[236px] md:block ${
                  index === 5 || index === 25
                    ? "pt-[140px]"
                    : index === 10 || index === 20
                      ? "pt-[220px]"
                      : index === 15
                        ? "pt-[360px]"
                        : ""
                }`}
              >
                <img
                  src={imageUrl}
                  className={`${
                    current[indexs] >= index ? "z-[1] animate-img" : "opacity-0"
                  } z-[--1] size-full h-[350px] rounded-2xl object-cover opacity-0`}
                />
              </div>

              <div
                className={`mb-3 block min-w-[180px] max-w-[180px] md:hidden`}
              >
                <img
                  src={imageUrl}
                  className={`${
                    current[indexs] >= index ? "z-[1] animate-img" : "opacity-0"
                  } z-[--1] size-full h-[230px] rounded-2xl object-cover opacity-0`}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
