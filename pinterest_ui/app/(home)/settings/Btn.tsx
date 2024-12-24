export function Btn({ text, disabled }: { text: string; disabled: boolean }) {
  return (
    <button
      disabled={disabled}
      className="rounded-full bg-red-500 px-4 py-3 text-[16px] font-semibold text-white active:bg-red-600 disabled:bg-gray-200 disabled:text-black/20"
    >
      {text}
    </button>
  );
}
