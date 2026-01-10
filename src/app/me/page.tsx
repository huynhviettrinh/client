import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import ProfileForm from "@/app/me/profile-form";
import { clientSessionToken } from "@/lib/http";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const result = await accountApiRequest.me(sessionToken ?? "");
  const dataUser = result.payload.data;

  return (
    <div>
      Profile
      <Profile name={dataUser.name} email={dataUser.email} />
      <ProfileForm profile={dataUser} />
    </div>
  );
}
