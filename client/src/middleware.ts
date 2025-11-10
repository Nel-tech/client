// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Decode JWT to get user role (if your JWT contains it)
function decodeJWT(token: string): { role?: string } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
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

  // Check if user is authenticated
  const isAuthenticated = !!(accessToken || refreshToken);

  // Try to get user role from JWT payload
  let userRole: string | undefined;
  if (accessToken) {
    const decoded = decodeJWT(accessToken);
    userRole = decoded?.role;
  }

  console.log('🛡️ Middleware:', { pathname, isAuthenticated, userRole });

  // ============================================
  // PUBLIC ROUTES - Allow everyone
  // ============================================
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/verify',
    '/unauthorized', // Allow everyone to see this page
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
    // ❌ NOT AUTHENTICATED → Redirect to login
    if (!isAuthenticated) {
      console.log(
        '🔒 Unauthenticated user trying to access protected route, redirecting to login'
      );
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
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
