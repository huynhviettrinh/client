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

  const handleOnLick = async () => {};

  return (
    <>
      <Button variant="outline" onClick={handleOnLick}>
        Button
      </Button>
      <div>{`name: ${dataUser?.name} email: ${dataUser?.email}`}</div>
    </>
  );
}
