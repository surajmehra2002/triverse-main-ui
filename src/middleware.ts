import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = [
  '/triverse-dashboard',
  '/company-dashboard',
  '/dashboard',
];

const getJwtSecretKey = () => {
  // const secret = process.env.JWT_SECRET_KEY;
  const secret = "guidonasoftpedia";
  if (!secret) throw new Error("JWT_SECRET_KEY is not defined");
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('token')?.value;

  // console.log('token is: ', token)
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJUUklWRVJTRV9TVVBFUl9BRE1JTiIsImlhdCI6MTc1MDkyMTMyOSwiZXhwIjoxNzUxMzUzMzI5fQ.ez_9XC0ipGRg08KSRaY7lpizVgu_8X-yRJtutFMHTlk        ";

  if (!token) return NextResponse.redirect(new URL('/', request.url));

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
// console.log("payload is: ", payload)
    const role = payload.role;
    
    if (pathname.startsWith('/triverse-dashboard') && role !== 'TRIVERSE_SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/company-dashboard') && role !== 'COMPANY_SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/dashboard') && role !== 'COMPANY_ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
// testing