import envConfig from "@/config";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_POINT}/account/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  }).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });

  return <div>page</div>;
}
