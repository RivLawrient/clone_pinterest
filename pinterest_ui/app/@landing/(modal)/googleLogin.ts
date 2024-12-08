export default function GoogleLogin() {
  window.location.href = `${process.env.HOST_API_PUBLIC}/auth/google`;
}
