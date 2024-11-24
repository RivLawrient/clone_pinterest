import { UserProvider } from "../(userContext)/User";
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
          <HeaderHome />
          {children}
        </PostProvider>
      </UserProvider>
    </div>
  );
}
