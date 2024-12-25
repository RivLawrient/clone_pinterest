import { FormProvider } from "./formUser";

export default function LayoutSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FormProvider>{children}</FormProvider>
    </div>
  );
}
