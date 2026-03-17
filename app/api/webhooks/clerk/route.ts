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