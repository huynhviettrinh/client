"use client";
import authApiRequest from "@/apiRequests/auth";
import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const { setUser } = useAppContext();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      authApiRequest.logoutNextClientToNextServer(true).then(() => {
        router.push("/login");
      });
    } finally {
      router.refresh();
      setUser(null);
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
