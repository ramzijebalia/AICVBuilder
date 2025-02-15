// this code wil activate authentification on all pages and api routes
// it just exclude some file types from authentification
// https://dashboard.clerk.com/apps/app_2poLgA88KqkKStaeeUyT9MlIVYk/instances/ins_2poLgFnIb1UD1QcV5Vy83PI1vBl

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// hre we mentioned some paths that we want to exclude from authentification ( we can open them even we are not login in )
// we can add for exmpale : "/forgot-password(.*)" , "/reset-password(.*)"
const isPublicRoute = createRouteMatcher(["/" , "/sign-in(.*)" , "sign-up(.*)", "/api/stripe-webhook"]);

export default clerkMiddleware(async (auth , request) =>{
    if(!isPublicRoute(request)){ // if the route is not public we will check if the user is authenticated or not
        await auth.protect();
    }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};