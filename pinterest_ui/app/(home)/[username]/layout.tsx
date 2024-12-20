import HeaderMbl from "./headerMbl";

export default function LayoutUsername({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderMbl />
      {children}
    </div>
  );
}
