import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <ul>
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
      </ul>
      <ModeToggle />
    </div>
  );
}
