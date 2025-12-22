import LoginForm from "@/app/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
