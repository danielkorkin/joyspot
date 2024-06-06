import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySignature } from "@svix/webhooks";
import { Svix } from "svix";

// Verify signature using your Svix secret
const svixWebhookSecret = process.env.SVIX_WEBHOOK_SECRET as string;

const webhook = new Svix(svixWebhookSecret);

export async function POST(request: NextRequest) {
	const payload = await request.text();
	const headers = request.headers;

	try {
		// Verify the webhook signature
		const event = webhook.verify(payload, headers);

		if (event.type === "user.created") {
			const user = event.data;

			// Create the user in the database
			await db.user.create({
				data: {
					id: user.id,
					email: user.email_addresses[0].email_address,
					name: `${user.first_name} ${user.last_name}`,
				},
			});

			return NextResponse.json(
				{ message: "User created successfully" },
				{ status: 201 }
			);
		} else {
			return NextResponse.json(
				{ message: "Event not handled" },
				{ status: 400 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Invalid request" },
			{ status: 400 }
		);
	}
}
