"use client";
import accountApiRequest from "@/apiRequests/account";
import { clientSessionToken } from "@/lib/http";
import { useEffect } from "react";

export default function Profile() {

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(
        clientSessionToken?.value || ""
      );

    };
    fetchRequest();
  }, []);
  return <div>Profile</div>;
}
