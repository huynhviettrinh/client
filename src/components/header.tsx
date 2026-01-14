import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountResType } from "@/schemaValidations/account.schema";
import Link from "next/link";

export default async function Header({
  userProp,
}: {
  userProp: AccountResType["data"] | null;
}) {
  return (
    <div className="h-20">
      <ul className="flex space-x-4">
        {!userProp ? (
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
              <Link rel="stylesheet" href="/me">
                <strong>Wellcome: {userProp.name}</strong>
              </Link>
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
