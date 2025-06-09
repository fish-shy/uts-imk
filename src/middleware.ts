// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req: { auth: { user: any } | null; nextUrl: URL; url: string }) => {
  const isLoggedIn = !!req.auth?.user;
  const url = req.nextUrl;

  if (!isLoggedIn && ["/quiz","/profile"].includes(url.pathname)) {
    console.log(`Middleware: Not logged in, accessing protected route. Redirecting to /login.`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && ["/login", "/register"].includes(url.pathname)) {
    console.log(`Middleware: Logged in, accessing auth route. Redirecting to /.`);
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log(`Middleware: Allowing request to proceed.`);
  return NextResponse.next();
});

export const config = {
  matcher: ["/profile", "/quiz", "/login", "/register"],
};