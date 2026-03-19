export const runtime = "nodejs";

import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {
  console.log("Webhook endpoint hit");

  try {
    const payload = await request.text();

    const headers = {
      "svix-id": request.headers.get("svix-id") ?? "",
      "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
      "svix-signature": request.headers.get("svix-signature") ?? "",
    };

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Missing CLERK_WEBHOOK_SECRET");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const wh = new Webhook(webhookSecret);

    let event: any;

    try {
      // verify webhook signature
      event = wh.verify(payload, headers);
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    console.log("clerk webhook received:", event.type);

    switch (event.type) {
      /**
       * USER CREATED
       */
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = event.data;

        const primaryEmail = email_addresses?.find(
          (email: any) => email.id === event.data.primary_email_address_id
        )?.email_address;

        const user = await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            email: primaryEmail ?? null,
            name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          },
          create: {
            id: id,
            clerkId: id,
            email: primaryEmail ?? null,
            name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          },
        });

        console.log("User synced:", user.id, user.email);

        break;
      }

      /**
       * USER UPDATED
       */
      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = event.data;

        const primaryEmail = email_addresses?.find(
          (email: any) => email.id === event.data.primary_email_address_id
        )?.email_address;

        const user = await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: primaryEmail ?? null,
            name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          },
        });

        console.log("User updated:", user.id);

        break;
      }

      /**
       * USER DELETED
       */
      case "user.deleted": {
        const { id } = event.data;

        await prisma.user.delete({
          where: { clerkId: id },
        });

        console.log("User deleted:", id);

        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// this file is used as the endpoint for Clerk webhooks.
// It listens for user-related events (created, updated, deleted) and syncs the user data with the local database using Prisma.
// The webhook signature is verified using the Svix library to ensure that the requests are legitimate.
// Make sure to set the CLERK_WEBHOOK_SECRET environment variable with the secret from your Clerk dashboard for webhook verification.
// You can customize the user data syncing logic as needed, but this example focuses on keeping the email and name fields up to date based on the Clerk user data.
// Note: In a production environment, you should also consider adding error handling and logging for better observability and debugging.
// To test this webhook, you can use the Clerk dashboard to send test webhooks or perform actions that trigger these events (like creating a user) and check your database to see if the changes are reflected.
// Remember to secure this endpoint and only allow requests from Clerk by verifying the webhook signature, as shown in the code above.