
export async function POST(request: Request) {
    const res = await request.json();
    const sesstionToken = res.payload?.data?.token;
    const expires = res.payload?.data?.expiresAt;
    if (!sesstionToken) {
        return Response.json({ message: "No session token" }, { status: 400 });
    }

    return Response.json(
        res.payload,
        {
            status: 200,
            headers: {
                "Set-Cookie": `sessionToken=${sesstionToken}; Path=/;HttpOnly`,
            },

        }
    );
}
