import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state')
        const error = url.searchParams.get('error')

        if (error) {
            console.error('oauth error', error)
            return NextResponse.redirect(new URL('/dashboard?error=oauth_denied', request.url))
        }

        if (!code || !state) {
            console.error('missing code or state ')
            return NextResponse.redirect(new URL('/dashboard?error=oauth_failed', request.url))
        }

        const { userId } = JSON.parse(Buffer.from(state, 'base64').toString())
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!
            })
        })

        const tokens = await tokenResponse.json()

        if (!tokens.access_token) {
            console.error('no access tokenr eveived', tokens)
            return NextResponse.redirect(new URL('/dashboard?error=no_access_token', request.url))
        }

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            console.error('user not found', userId)
            return NextResponse.redirect(new URL('/dashboard?error=user_not_found', request.url))
        }

        await prisma.user.update({
            where: {
                clerkId: userId
            },
            data: {
                googleAccessToken: tokens.access_token,
                googleRefreshToken: tokens.refresh_token,
                calendarConnected: true,
                googleTokenExpiry: new Date(Date.now() + (tokens.expires_in * 1000))
            }
        })


        return NextResponse.redirect(new URL('/dashboard?connected=direct', request.url))
    } catch (error) {
        console.error('callback error: ', error)
        return NextResponse.redirect(new URL('/dashboard?error=callback_failed', request.url))
    }
}

//  This file is used as the callback URL for Google OAuth.
//  It handles the exchange of the authorization code for access and refresh tokens, and then saves those tokens to the user's record in the database.
//  Finally, it redirects the user back to the dashboard with a success or error message based on the outcome of the process.

// Note: Make sure to set the GOOGLE_REDIRECT_URI environment variable to point to this route, e.g. http://localhost:3000/api/auth/google/callback for local development.
// Also, ensure that the Google OAuth client is configured to allow this redirect URI in the Google Cloud Console.
// Error handling is included to manage various failure scenarios, such as missing parameters, token exchange failures, and database issues.
// This implementation assumes that the user is already authenticated with Clerk and that the state parameter contains the user's Clerk ID encoded in base64.
//  Adjust as necessary based on your authentication flow.
//  Remember to handle token refresh logic elsewhere in your application, as access tokens typically have a limited lifespan.
// This code is a critical part of the Google Calendar integration, enabling users to connect their Google accounts and allowing the application to access their calendar data for scheduling purposes.
// Ensure that you have the necessary scopes configured in your Google OAuth consent screen to access the user's calendar data, such as 'https://www.googleapis.com/auth/calendar'.
// Always test the OAuth flow thoroughly to ensure that tokens are being handled securely and that the user experience is smooth, especially in error scenarios.
// Security Note: Be cautious when handling OAuth tokens. Ensure that they are stored securely and that your application follows best practices for authentication and authorization to protect user data.
// This file is a server-side route handler for the Google OAuth callback in a Next.js application.
//  It processes the response from Google's OAuth service, exchanges the authorization code for access and refresh tokens,
//  and updates the user's record in the database with these tokens.
//  Finally, it redirects the user back to the dashboard with an appropriate success or error message based on the outcome of the process.