import { NextResponse, NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const productPath = ["/products/add"];
const productEditRegex = /^\/products\/edit\/\d+$/;
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  console.log(productPath[1]);

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }
  if (productPath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/products", request.url));
  }
  if (pathname.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL("/products", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/me",
    "/login",
    "/register",
    "/products/add",
    "/products/edit/:path*",
  ],
};
