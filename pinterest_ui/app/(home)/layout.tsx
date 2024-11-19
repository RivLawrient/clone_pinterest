import { UserProvider } from "../(userContext)/User";
import HeaderHome from "./(Header)/header";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserProvider>
        <HeaderHome />
        {children}
      </UserProvider>
    </div>
  );
}
