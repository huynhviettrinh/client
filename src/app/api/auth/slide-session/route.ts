import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;

  if (!sessionToken) {
    return Response.json({ message: "No session token" }, { status: 401 });
  }
  try {
    const res = await authApiRequest.slideSessionFromNextServerToServer(
      sessionToken
    );
    const newExpiresDate = new Date(res.payload.data.expiresAt).toUTCString();
    console.log(newExpiresDate);

    return Response.json(res.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${newExpiresDate}`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        { message: "Error route slide session" },
        {
          status: 500,
        }
      );
    }
  }
}
