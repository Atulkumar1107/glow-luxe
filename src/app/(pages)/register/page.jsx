import Header from "@/components/Header";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 mt-12 px-4">
      <Header forceDark={true} />
      <RegisterForm />
    </div>
  );
}
