import { useNotif } from "@/app/(notifContext)/Notif";
import { useFormContext } from "./formUser";
import { useUser } from "@/app/(userContext)/User";

export function Btn({ text }: { text: string }) {
  const { user } = useUser();
  const { form, setForm } = useFormContext();
  const { setMsg, setIsError, triggerNotif } = useNotif();

  const HandleBtn = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/user/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          setMsg(data.errors);
          setIsError(true);
          triggerNotif();
        }
      })
      .catch(() => {
        setMsg("server offline");
        setIsError(true);
        triggerNotif();
      });
  };
  return (
    <button
      disabled={
        form.username == user?.username &&
        form.first_name == user?.first_name &&
        form.last_name == user?.last_name &&
        form.profile_img == user?.profile_img
      }
      onClick={HandleBtn}
      className="rounded-full bg-red-500 px-4 py-3 text-[16px] font-semibold text-white active:bg-red-600 disabled:bg-gray-200 disabled:text-black/20"
    >
      {text}
    </button>
  );
}
