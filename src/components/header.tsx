import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequests/account";

export default async function Header() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let user = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken);
    user = data.payload.data;
  }
  return (
    <div className="h-20">
      <ul className="flex space-x-4">
        {!user ? (
          <>
            <li>
              <Link rel="stylesheet" href="/login">
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link rel="stylesheet" href="/register">
                Đăng ký
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link rel="stylesheet" href="/products">
                List product
              </Link>
            </li>{" "}
            <li>
              <strong>Wellcome: {user.name}</strong>
            </li>
            <li>
              {" "}
              <ButtonLogout />
            </li>
          </>
        )}
        <ModeToggle />
      </ul>
    </div>
  );
}
