export default function NotifPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        id="cameraInput"
      ></input>
      {/* <span>there isn't any yet</span> */}
    </div>
  );
}
