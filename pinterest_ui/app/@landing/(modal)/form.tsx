import SingIn from "./signin";
import SignUp from "./signup";

export default function Form({
  isSignin,
  setIsSignin,
  setOpen,
  isPopUp,
}: {
  isSignin: boolean;
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPopUp: boolean;
}) {
  return (
    // <>
    //   {isSignin ? (
    //     <SingIn setOpen={setOpen} setIsSignin={setIsSignin} />
    //   ) : (
    //     <SignUp setOpen={setOpen} setIsSignin={setIsSignin} />
    //   )}
    // </>
    <>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-white px-[10px] pb-6 pt-[20px] md:h-fit md:w-[484px] md:rounded-[32px]">
        {isPopUp && (
          <div
            onClick={() => {
              setOpen(false);
            }}
            className="absolute right-0 top-0 m-4 flex size-[40px] cursor-pointer items-center justify-center rounded-full hover:bg-slate-100"
          >
            <svg
              aria-hidden="true"
              aria-label=""
              className="fill-black"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
            </svg>
          </div>
        )}
        <div className="my-2">
          <svg
            height="40"
            viewBox="-3 -3 82 82"
            width="40"
            className="fill-[#e60023]"
          >
            <title>Pinterest logo</title>
            <circle cx="38" cy="38" fill="white" r="40"></circle>
            <path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z"></path>
          </svg>
        </div>
        <div className="font-roboto1 text-[32px] font-semibold tracking-[-1.2px] text-[#333333]">
          Welcome to Pinterest
        </div>
        {isSignin ? (
          <SingIn setOpen={setOpen} setIsSignin={setIsSignin} />
        ) : (
          <SignUp setOpen={setOpen} setIsSignin={setIsSignin} />
        )}
      </div>
    </>
  );
}
