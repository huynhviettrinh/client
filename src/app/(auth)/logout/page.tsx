"use client";
import authApiRequest from "@/apiRequests/auth";
import { clientSessionToken } from "@/lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sesstionToken = searchParams.get("sessionToken");

  useEffect(() => {
    if (sesstionToken === clientSessionToken.value) {
      authApiRequest.logoutNextClientToNextServer(true).then((res) => {
        router.push("/login");
      });
    }
  }),
    [sesstionToken];
  return (
    <>
      <div>Page</div>
    </>
  );
}
