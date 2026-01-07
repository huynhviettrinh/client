import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import { clientSessionToken } from "@/lib/http";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const result = await accountApiRequest.me(sessionToken || "");

  return (
    <div>
      profile
      {/* <Profile /> */}
    </div>
  );
}
