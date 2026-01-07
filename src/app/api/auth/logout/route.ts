import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  // force = true ep  buoc logout
  const force = res.force as boolean | undefined;
  if (force) {
    if (force) {
      return Response.json(
        { message: "Buoc dang xuat thanh cong" },
        {
          status: 200,
          headers: {
            "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
          },
        }
      );
    }
  }
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json({ message: "No session token" }, { status: 401 });
  }

  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      sessionToken.value
    );

    return Response.json(result.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        { message: "Error route logout" },
        {
          status: 500,
        }
      );
    }
  }
}
