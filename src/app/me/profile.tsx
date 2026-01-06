"use client";
import accountApiRequest from "@/apiRequests/account";
import { clientSessionToken } from "@/lib/http";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  type dataUser = {
    name: string;
    email: string;
  };

  const [dataUser, setDataUser] = useState<dataUser>();

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(
        clientSessionToken?.value || ""
      );
      setDataUser(result.payload.data);
    };
    fetchRequest();
  }, []);

  const handleOnLick = async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  };

  return (
    <>
      <Button variant="outline" onClick={handleOnLick}>
        Button
      </Button>
      <div>{`name: ${dataUser?.name} email: ${dataUser?.email}`}</div>
    </>
  );
}
