import { UserProvider } from "../(userContext)/User";
import Bottom from "./(Header)/bottom";
import HeaderHome from "./(Header)/header";
import { PostProvider } from "./(postContext)/Post";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserProvider>
        <PostProvider>
          {/* <DetailProvider> */}
          <div className={`hidden md:block`}>
            <HeaderHome />
          </div>
          <div className={`block md:hidden`}>
            <Bottom />
          </div>
          {children}
          {/* </DetailProvider> */}
        </PostProvider>
      </UserProvider>
    </div>
  );
}
