import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// This is the middleware that protects the routes in our application using Clerk for authentication
// It checks if the user is authenticated and if they are trying to access a protected route
// If they are not authenticated and trying to access a protected route, it redirects them to the sign-in page
// We can customize the list of protected routes in the createRouteMatcher function
// We can also add custom logic before redirecting to the sign-in page if needed, such as logging or showing a notification
// The config object specifies which routes the middleware should run on, in this case, it runs on all routes except for Next.js internals and static files, and it always runs for API routes
// To use this middleware, we need to place this file in the root of our Next.js project and name it middleware.ts
// Make sure to install the @clerk/nextjs package and set up Clerk in your application for this middleware to work properly
// For more information on how to set up Clerk and use this middleware, you can refer to the Clerk documentation: https://clerk.com/docs/nextjs/middleware