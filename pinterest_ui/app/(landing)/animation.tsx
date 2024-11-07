"use client";

import { useEffect, useState } from "react";

export function AnimateImg() {
  const images = [
    [
      "https://i.pinimg.com/236x/e3/41/4b/e3414b2fcf00375a199ba6964be551af.jpg",
      "https://i.pinimg.com/236x/78/6e/00/786e00eab219eca59803d118fbe0feb3.jpg",
      "https://i.pinimg.com/236x/3b/42/b0/3b42b02bf047097582b26401df90cdb3.jpg",
      "https://i.pinimg.com/236x/de/13/6b/de136b0fa0037d3453a430895d8a5c27.jpg",
      "https://i.pinimg.com/236x/15/bf/41/15bf41a80a0ffb41cc9d0fd98abed34b.jpg",
      "https://i.pinimg.com/236x/c4/57/bd/c457bd9496170bfa3845b7cee775df65.jpg",
      "https://i.pinimg.com/236x/05/65/20/05652045e57af33599557db9f23188c0.jpg",
      "https://i.pinimg.com/236x/c5/83/53/c58353e15f32f3cbfc7cdcbcf0dc2f34--mango-coulis-m-sorry.jpg",
      "https://i.pinimg.com/564x/94/43/b9/9443b93bd8773fec91bc1837e8424e8e.jpg",
      "https://i.pinimg.com/564x/e6/8a/42/e68a42c2e530fbdf6b3ab2f379dcd384.jpg",
      "https://i.pinimg.com/236x/95/f3/73/95f373590dad79bcf3202ce6edad5bcd.jpg",
      "https://i.pinimg.com/236x/e7/c6/c6/e7c6c65c6e38f43d4b979d3cb1e46bf7.jpg",
      "https://i.pinimg.com/236x/fb/18/de/fb18deb4959e9a0678e1bf99105ea775.jpg",
      "https://i.pinimg.com/564x/c5/61/c2/c561c2a77d5b9b03702efc423b18cb9a.jpg",
      "https://i.pinimg.com/564x/64/cf/21/64cf2184d33446c4cf1cc8c3c585b9f4.jpg",
      "https://i.pinimg.com/236x/06/e8/14/06e814c8c5c82b9bf794add896616e12.jpg",
      "https://i.pinimg.com/236x/62/bb/97/62bb9727b2e09751d43c32589c503b39.jpg",
      "https://i.pinimg.com/564x/a9/f9/09/a9f90926afdfbff79f6d2a017c8e19dd.jpg",
      "https://i.pinimg.com/564x/96/2c/ce/962cce1d513d665ecca6eb733a90a160.jpg",
      "https://i.pinimg.com/564x/af/60/9e/af609e357a691876ac58d02e27af316e.jpg",
      "https://i.pinimg.com/236x/d5/5f/97/d55f97078c0d7b60b758cac3b34114c9.jpg",
      "https://i.pinimg.com/236x/22/45/e2/2245e261944f1eae080423f6ff7805e1--romantic-picnics-romantic-ideas.jpg",
      "https://i.pinimg.com/236x/65/df/cd/65dfcdd2fc433d45baedb3666cacfd82.jpg",
      "https://i.pinimg.com/564x/28/77/f4/2877f4e254c0bd27ac4f4c5d8a43404f.jpg",
      "https://i.pinimg.com/564x/8b/21/b0/8b21b0133442afd03d2c5e9a998c96b3.jpg",
      "https://i.pinimg.com/236x/48/9c/d9/489cd9ae5fec17977c73677866202d59.jpg",
      "https://i.pinimg.com/236x/14/73/0a/14730af41a58e05384b86b0bacf9d57b.jpg",
      "https://i.pinimg.com/236x/16/36/dd/1636dd650e6289cd0ec4f4f06dea7835--british-recipes-the-great-british-bake-off-recipes.jpg",
      "https://i.pinimg.com/564x/da/fe/1e/dafe1e26613892b2bc26508b33de353d.jpg",
      "https://i.pinimg.com/564x/f3/9c/11/f39c11819b48bf4dc34fa1670fb1fef6.jpg",
      "https://i.pinimg.com/236x/d4/32/cd/d432cdc35cf6cc5c7ec07a5036a87bca.jpg",
      "https://i.pinimg.com/236x/c1/d0/7f/c1d07f45a5c2b121255ba9ec54b9adf7.jpg",
      "https://i.pinimg.com/236x/18/dc/f7/18dcf759aa96740f8d335dc6231a9cf9.jpg",
      "https://i.pinimg.com/564x/63/3e/c1/633ec1128e0b7ed911c462cb89620c64.jpg",
      "https://i.pinimg.com/564x/4f/df/82/4fdf820192314371138c0f4f999cdddc.jpg",
    ],
    [
      "https://i.pinimg.com/236x/28/85/8c/28858cedb11e772b00edd867009c5e88.jpg",
      "https://i.pinimg.com/236x/42/57/16/4257161f841b16b62c3aa92d881a9e8d.jpg",
      "https://i.pinimg.com/236x/f4/8e/ca/f48eca8c68ffb9e72ab74627c3597ce9--best-bathrooms-small-bathrooms.jpg",
      "https://i.pinimg.com/564x/3f/47/95/3f479578058904cca0a0e8d693045459.jpg",
      "https://i.pinimg.com/564x/6f/25/cc/6f25cc5393793930bf9b7106f55c89cf.jpg",
      "https://i.pinimg.com/236x/a4/7c/6e/a47c6eff8a1b1d5e92f8985cb6aed67d.jpg",
      "https://i.pinimg.com/236x/ae/91/ab/ae91abd87cc085d894a44f6b34c8129c.jpg",
      "https://i.pinimg.com/236x/d2/d4/12/d2d41273edca79dae8db151aa28f77d5--blue-grey-bathrooms-tile-bathrooms.jpg",
      "https://i.pinimg.com/564x/e3/43/12/e34312fc1c469f1e4847282160eabe18.jpg",
      "https://i.pinimg.com/564x/b9/9b/ac/b99bacfed714e9fafd218c503bf2f300.jpg",
      "https://i.pinimg.com/236x/c3/5f/ca/c35fcaff9941bce718cf9f4de3f33f57.jpg",
      "https://i.pinimg.com/236x/f0/da/94/f0da949d68d13c22fc2082eb33f77b0f.jpg",
      "https://i.pinimg.com/236x/62/6c/70/626c70231c0ef5f21a54737a928c65b0.jpg",
      "https://i.pinimg.com/564x/28/ab/82/28ab8205553272aa751e237165ea897a.jpg",
      "https://i.pinimg.com/564x/a7/f2/61/a7f2614d15753b9c1385ae34391510df.jpg",
      "https://i.pinimg.com/236x/ca/ee/6f/caee6fb84a927407fd03e9f499ecaae2.jpg",
      "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
      "https://i.pinimg.com/564x/f5/5d/64/f55d6493be57f90310d15b5e1a20c682.jpg",
      "https://i.pinimg.com/564x/66/90/98/6690982410d9194543c1ffbf13fbb60b.jpg",
      "https://i.pinimg.com/564x/e6/51/2b/e6512b773ee1e141408b3ca47dce92d6.jpg",
      "https://i.pinimg.com/236x/22/3a/40/223a4015ad7e274eb928024d4aa59f95.jpg",
      "https://i.pinimg.com/236x/a3/b6/5f/a3b65f745a80671af4312b275c06c27e.jpg",
      "https://i.pinimg.com/236x/ca/6b/0c/ca6b0cc45aa9d33143b67a09ed75959a.jpg",
      "https://i.pinimg.com/564x/87/79/c6/8779c6f5ccdff8cbdedef7851b7d3682.jpg",
      "https://i.pinimg.com/564x/51/74/59/5174594f50a3e50880fb5c32394e45e3.jpg",
      "https://i.pinimg.com/236x/f8/97/30/f89730229686d12c34f5a5a500aaebcd.jpg",
      "https://i.pinimg.com/236x/b1/1b/31/b11b310559340fbd1b7777f806a418a9.jpg",
      "https://i.pinimg.com/236x/b7/45/04/b74504c09af83f71e8af41abc6f29732.jpg",
      "https://i.pinimg.com/564x/e3/35/ec/e335ecf9ba6ce14dc40b52d2721d2215.jpg",
      "https://i.pinimg.com/564x/49/2d/ef/492def5c84b3fbf6a7a0292e712ae007.jpg",
      "https://i.pinimg.com/236x/ee/d3/dc/eed3dca79abceab30f836d2db806c0e1.jpg",
      "https://i.pinimg.com/236x/18/8a/6f/188a6f3c7c25901023cd7c564281a40c.jpg",
      "https://i.pinimg.com/236x/2c/e0/6d/2ce06d9926b65f60dc4ae9eff1a13c7f.jpg",
      "https://i.pinimg.com/564x/dc/63/7c/dc637c7b497b00a4b097bdbe62184fa1.jpg",
      "https://i.pinimg.com/564x/fe/fe/a5/fefea57d65ac52136f2e55a13e1ad17f.jpg",
    ],
    [
      "https://i.pinimg.com/236x/7a/e3/37/7ae3370edba908ba0df9469d5d6133b0.jpg",
      "https://i.pinimg.com/236x/d2/3f/c8/d23fc8dd63c85874f8e12fd79c9662e1.jpg",
      "https://i.pinimg.com/236x/a1/10/e1/a110e1bc0897daf7fb10ee75c0d25639.jpg",
      "https://i.pinimg.com/564x/86/8e/56/868e5698a3cd46d753459ff448ab6c16.jpg",
      "https://i.pinimg.com/550x/81/30/fc/8130fcdd4cac0a958df25b4a71a96f35.jpg",
      "https://i.pinimg.com/236x/b8/ac/51/b8ac51e8e5d9de70114f431574907072.jpg",
      "https://i.pinimg.com/236x/7c/4f/39/7c4f3961236c4914b25a7ec06f8e08e2.jpg",
      "https://i.pinimg.com/236x/3d/40/c9/3d40c99ac6cbb6cd441a1b5fb20cd459.jpg",
      "https://i.pinimg.com/564x/c7/84/cf/c784cfe161c81737cdf2b0f1cfd892cd.jpg",
      "https://i.pinimg.com/564x/b9/54/9f/b9549f80f3a7dbc5a11a4851c1c076b7.jpg",
      "https://i.pinimg.com/550x/47/92/b7/4792b7bdc6bb8d59304f23d7ac6d109a.jpg",
      "https://i.pinimg.com/236x/92/42/6d/92426d84cd455d958db778d54a94fd00.jpg",
      "https://i.pinimg.com/236x/28/cc/1f/28cc1f5464d7ba55a56e05ee85707dbc.jpg",
      "https://i.pinimg.com/564x/1c/4e/22/1c4e22bc826843b92969d00d3bec53b9.jpg",
      "https://i.pinimg.com/564x/85/a2/1a/85a21aea41cdecdb2de94e16f50db7d0.jpg",
      "https://i.pinimg.com/236x/3f/05/2c/3f052c9b0f402d3373b9e0916c53bac7.jpg",
      "https://i.pinimg.com/236x/b1/44/33/b14433a316a98aa75c4f12b0910ad549.jpg",
      "https://i.pinimg.com/564x/25/95/e0/2595e04c8dd984d89d28db0957a76d1d.jpg",
      "https://i.pinimg.com/564x/c5/bc/21/c5bc21a1fc21b6015acf43f0a939c833.jpg",
      "https://i.pinimg.com/564x/85/c5/62/85c562e7f72b6cccaa3f09399077bc22.jpg",
      "https://i.pinimg.com/236x/81/20/26/812026f8ac451726e00f05c7ebed409a.jpg",
      "https://i.pinimg.com/236x/c7/11/83/c71183098d2198cd9006e939b7ec3afb.jpg",
      "https://i.pinimg.com/236x/30/29/45/3029453a4d74034d64beb8f6021ce710.jpg",
      "https://i.pinimg.com/564x/68/8f/b1/688fb1db4da88f6c6749249e8d2b3734.jpg",
      "https://i.pinimg.com/564x/98/fd/d7/98fdd7f1ecc1c8935ccf39d2aac81f09.jpg",
      "https://i.pinimg.com/236x/ec/3d/16/ec3d16a602038f70dba288bc00ec7e37.jpg",
      "https://i.pinimg.com/236x/a7/02/84/a70284853f4e02c9038123ea77fd0186.jpg",
      "https://i.pinimg.com/550x/8c/2b/a8/8c2ba8d19852209a6ab8f69e097ff278.jpg",
      "https://i.pinimg.com/564x/1b/8b/52/1b8b52de400ad51e36af7217d2347a83.jpg",
      "https://i.pinimg.com/236x/67/2f/71/672f7160ee2b9130ac177fb3ed975213.jpg",
      "https://i.pinimg.com/236x/bf/36/3a/bf363a930744d78f467787241198e51a.jpg",
      "https://i.pinimg.com/236x/b9/44/72/b944727d606e5429bd1774790ef79353.jpg",
      "https://i.pinimg.com/236x/a0/a0/5c/a0a05cc39b3668ec4b07b58ced608dac.jpg",
      "https://i.pinimg.com/564x/83/ac/64/83ac64291afee7c00c3b2d3bec6c79e0.jpg",
      "https://i.pinimg.com/564x/8c/a8/5f/8ca85fd7930a2d8e180f9b229341d2c6.jpg",
    ],
    [
      "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
      "https://i.pinimg.com/236x/01/84/ca/0184cafdc51049a7d1cc9df88e87db18.jpg",
      "https://i.pinimg.com/236x/82/78/85/8278857ebd0192658d565a968a7df1cc.jpg",
      "https://i.pinimg.com/564x/c6/40/4d/c6404d3c1ed97ca0360e0cb634fef9ac.jpg",
      "https://i.pinimg.com/564x/22/ab/69/22ab69682a7e4b2915e747b711bcc4fc.jpg",
      "https://i.pinimg.com/550x/a7/87/20/a78720c39a39ac50a2856420d636d113.jpg",
      "https://i.pinimg.com/236x/51/97/90/5197905f29a3bf796150506e12cb234c.jpg",
      "https://i.pinimg.com/236x/9e/42/22/9e422240981aebcbe435c05c26f4bec3.jpg",
      "https://i.pinimg.com/564x/fa/85/77/fa857720e454dd729417920b187493e2.jpg",
      "https://i.pinimg.com/564x/79/97/d8/7997d893274f6359839d6fe72b1892d6.jpg",
      "https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg",
      "https://i.pinimg.com/236x/fa/85/77/fa857720e454dd729417920b187493e2.jpg",
      "https://i.pinimg.com/236x/52/a3/d1/52a3d167e25b31783c49d629294a3c35.jpg",
      "https://i.pinimg.com/564x/6a/f6/71/6af67110eb902f81523fae20e7220179.jpg",
      "https://i.pinimg.com/564x/33/06/19/330619f00ec91194d49140f4630340fe.jpg",
      "https://i.pinimg.com/236x/71/9a/84/719a84fd80e49047407371ef9b3c224d.jpg",
      "https://i.pinimg.com/236x/9b/52/9d/9b529dd5d75523e9a6bf29dbf09f404a.jpg",
      "https://i.pinimg.com/564x/57/70/c6/5770c654b38898b9a2aaf27973576f35.jpg",
      "https://i.pinimg.com/564x/b7/6c/fb/b76cfb380344cf5b45ad4696b6f5541b.jpg",
      "https://i.pinimg.com/564x/d3/df/97/d3df973696928fd387a4bbb1745eddf9.jpg",
      "https://i.pinimg.com/236x/f4/dc/58/f4dc58f3bddf1c5b5249511820246df8.jpg",
      "https://i.pinimg.com/236x/50/9e/3a/509e3ac9af5c305e83eddc25b748214b.jpg",
      "https://i.pinimg.com/236x/a8/08/b6/a808b697d728434d944a5d99abdbcb13.jpg",
      "https://i.pinimg.com/564x/be/7c/18/be7c18ae62b7837e94fb819dfdf38fa2.jpg",
      "https://i.pinimg.com/564x/f4/dc/58/f4dc58f3bddf1c5b5249511820246df8.jpg",
      "https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg",
      "https://i.pinimg.com/236x/61/be/0f/61be0fd258626af4deab36336b9abd94.jpg",
      "https://i.pinimg.com/236x/47/f4/3e/47f43e7f2b1bd7e6596e47cc781c7799.jpg",
      "https://i.pinimg.com/564x/d3/ef/ea/d3efea44c1c69838dac154f0555adb05.jpg",
      "https://i.pinimg.com/564x/6a/ea/1c/6aea1c0bc96840a03644ed7b460fac9e.jpg",
      "https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg",
      "https://i.pinimg.com/236x/4a/bf/51/4abf5134ee423d583ce03707a166c16e.jpg",
      "https://i.pinimg.com/236x/7f/c8/1e/7fc81ec2166365721b8fd0d2f875671d.jpg",
      "https://i.pinimg.com/564x/31/fc/43/31fc438686df6b34e2544865d0c111a3.jpg",
      "https://i.pinimg.com/564x/9e/42/22/9e422240981aebcbe435c05c26f4bec3.jpg",
    ],
  ];

  const [step, setStep] = useState<number>(0);
  const [current, setCurrent] = useState<number[]>([-1, -1, -1, -1]);

  useEffect(() => {
    for (let i = 0; i <= 35; i++) {
      setTimeout(() => {
        setCurrent((prev) =>
          prev.map((v, index) => (index === (step + 1) % 4 ? i - 1 : v))
        );
      }, 50 * i);
    }
    const interval = setTimeout(() => {
      setStep((prevStep) => {
        const nextStep = (prevStep + 1) % 4;
        if (nextStep === 0) {
          setTimeout(() => {
            setStep(nextStep);
          }, 2000);
          return prevStep;
        }
        return nextStep;
      });
    }, 5400);

    return () => clearTimeout(interval);
  }, [step]);

  useEffect(() => {
    console.log(current, step);
  }, [current]);

  return (
    <>
      <div className="w-screen justify-center flex">
        {images.map((values: string[], indexs: number) => (
          <div key={indexs} className="columns-7 gap-3 w-fit absolute">
            {values.map((imageUrl: string, index: number) => (
              <div
                key={index}
                className={`min-w-[236px] max-w-[236px] relative bg-white mb-3 ${
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
                    current[indexs] >= index
                      ? "animate-img z-20 relative"
                      : "invisible "
                  } opacity-0 rounded-2xl object-cover h-[350px] size-full
                  `}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
