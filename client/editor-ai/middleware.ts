
// import { cookies } from "node_modules/next/headers";
// import { NextRequest, NextResponse } from "node_modules/next/server";

import { cookies } from "node_modules/next/headers";
import { NextRequest, NextResponse } from "node_modules/next/server";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
  const response = await fetch(`${apiUrl}/api/verify-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
}
export const config = {
  matcher: ["/pages/homepage", "/"]
};