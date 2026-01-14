"use client";
import accountApiRequest from "@/apiRequests/account";
import { clientSessionToken } from "@/lib/http";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Profile({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  // type dataUser = {
  //   name: string;
  //   email: string;
  // };

  // const [dataUser, setDataUser] = useState<dataUser>();

  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     const result = await accountApiRequest.me(
  //       clientSessionToken?.value || ""
  //     );
  //     setDataUser(result.payload.data);
  //   };
  //   fetchRequest();
  // }, []);

  return (
    <>
      <div className="mt-2 mb-5">
        <p>{`Name: ${name}`}</p>
        <p>{`Email: ${email}`}</p>
      </div>
    </>
  );
}
