import RegisterForm from "@/app/(auth)/register/register-form";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
