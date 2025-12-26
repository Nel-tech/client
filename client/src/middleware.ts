// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJWT(token: string): { role?: string; exp?: number } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.log('🕐 Token expired');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get tokens from httpOnly cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = false;
  let userRole: string | undefined;

  // ✅ Check if user has valid access token
  if (accessToken) {
    const decoded = decodeJWT(accessToken);
    if (decoded) {
      isAuthenticated = true;
      userRole = decoded.role;
    }
  }

  // ✅ CRITICAL: If access token is expired/missing BUT refresh token exists,
  // treat as authenticated and let client-side interceptor handle refresh
  const hasRefreshToken = !!refreshToken;

  console.log('🛡️ Middleware:', {
    pathname,
    isAuthenticated,
    hasRefreshToken,
    userRole,
  });

  // ============================================
  // PUBLIC ROUTES - Allow everyone
  // ============================================
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/verify',
    '/unauthorized',
  ];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/auth/')
  );

  // ============================================
  // PROTECT HOMEPAGE - Redirect logged-in users
  // ============================================
  if (pathname === '/') {
    if (isAuthenticated && userRole) {
      const dashboardUrl =
        userRole === 'Artist' ? '/artist/dashboard' : '/fans/dashboard';

      console.log(
        `🔀 Redirecting authenticated ${userRole} from / to ${dashboardUrl}`
      );
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // User not authenticated - allow access to homepage
    return NextResponse.next();
  }

  // ============================================
  // PROTECT AUTH PAGES - Redirect logged-in users away
  // ============================================
  if (pathname.startsWith('/auth/')) {
    if (isAuthenticated && userRole) {
      const dashboardUrl =
        userRole === 'Artist' ? '/artist/dashboard' : '/fans/dashboard';

      console.log(
        `🔀 Redirecting authenticated ${userRole} from auth page to ${dashboardUrl}`
      );
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // User not authenticated - allow access to auth pages
    return NextResponse.next();
  }

  // ============================================
  // ALLOW UNAUTHORIZED PAGE - For all users
  // ============================================
  if (pathname === '/unauthorized') {
    return NextResponse.next();
  }

  // ============================================
  // PROTECT DASHBOARD ROUTES - Require authentication & check role
  // ============================================
  if (pathname.startsWith('/artist/') || pathname.startsWith('/fans/')) {
    // ✅ CRITICAL FIX: Allow if has refresh token (let interceptor handle refresh)
    if (!isAuthenticated && !hasRefreshToken) {
      console.log('🔒 No valid tokens, redirecting to login');
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ✅ If access token expired but refresh token exists, allow through
    // The client-side interceptor will refresh the token
    if (!isAuthenticated && hasRefreshToken) {
      console.log(
        '⏳ Access token expired but refresh token exists, allowing through for client refresh'
      );
      return NextResponse.next();
    }

    // ✅ AUTHENTICATED but WRONG ROLE → Redirect based on role
    if (pathname.startsWith('/artist/') && userRole !== 'Artist') {
      console.log('🚫 Non-artist trying to access artist routes');

      // If they're a fan, redirect to fan dashboard
      if (userRole === 'Fan') {
        return NextResponse.redirect(new URL('/fans/dashboard', request.url));
      }

      // Unknown role → show unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/fans/') && userRole !== 'Fan') {
      console.log('🚫 Non-fan trying to access fan routes');

      // If they're an artist, redirect to artist dashboard
      if (userRole === 'Artist') {
        return NextResponse.redirect(new URL('/artist/dashboard', request.url));
      }

      // Unknown role → show unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // ✅ AUTHENTICATED + CORRECT ROLE → Allow access
    return NextResponse.next();
  }

  // All other routes - allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
