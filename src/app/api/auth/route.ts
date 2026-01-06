export async function POST(request: Request) {
    const res = await request.json();
    const sessionToken = res.sessionToken as string;
    const expires = res.payload?.data?.expiresAt;
    if (!sessionToken) {
        return Response.json({ message: "No session token" }, { status: 400 });
    }

    return Response.json(
        res,
        {
            status: 200,
            headers: {
                "Set-Cookie": `sessionToken=${sessionToken}; Path=/;HttpOnly`,
            },

        }
    );
}
