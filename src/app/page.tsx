"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <main></main>
    </div>
  );
}
