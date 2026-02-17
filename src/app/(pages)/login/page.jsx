import Header from "@/components/Header";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 mt-12 px-4">
      <Header forceDark={true} />
      <LoginForm />
    </div>
  );
}
