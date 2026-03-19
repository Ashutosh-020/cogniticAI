import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.redirect('/sign-in')
        }

        const state = Buffer.from(JSON.stringify({ userId })).toString('base64')

        const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
        googleAuthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!)
        googleAuthUrl.searchParams.set('redirect_uri', process.env.GOOGLE_REDIRECT_URI!)
        googleAuthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.readonly')
        googleAuthUrl.searchParams.set('response_type', 'code')
        googleAuthUrl.searchParams.set('access_type', 'offline')
        googleAuthUrl.searchParams.set('prompt', 'consent')
        googleAuthUrl.searchParams.set('state', state)

        return NextResponse.redirect(googleAuthUrl.toString())
    } catch (error) {
        console.error('Direct OAuth error:', error)
        return NextResponse.json({ error: "Failed to setup OAuth" }, { status: 500 })
    }
}

// This file is for direct connection flow, where user can connect their google calendar without going through the full oauth flow.
//  This is used when we already have the user's consent and just need to get the access token.
// The flow is as follows:
// 1. User clicks on "Connect Google Calendar" button in the dashboard.
// 2. We check if we already have the user's consent and if we can directly get the access token using the refresh token.
// 3. If we can get the access token, we save it to the database and redirect the user back to the dashboard with a success message.
// 4. If we cannot get the access token (e.g. no refresh token or refresh token is expired),
//  we redirect the user to the full OAuth flow to re-authenticate and get a new access token and refresh token.