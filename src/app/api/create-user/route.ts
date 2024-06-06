import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { Webhook } from "svix";
import { WebhookEvent } from "@/src/lib/types";

const webhookSecret = process.env.WEBHOOK_SECRET as string;

export async function POST(request: NextRequest) {
	const svixHeaders = {
		"svix-id": request.headers.get("svix-id") ?? "",
		"svix-timestamp": request.headers.get("svix-timestamp") ?? "",
		"svix-signature": request.headers.get("svix-signature") ?? "",
	};

	const payload = await request.text();

	const webhook = new Webhook(webhookSecret);
	let event: WebhookEvent;

	try {
		event = webhook.verify(payload, svixHeaders) as WebhookEvent;
	} catch (error) {
		return NextResponse.json(
			{ message: "Invalid request" },
			{ status: 400 }
		);
	}

	if (event.type === "user.created") {
		const user = event.data;

		try {
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
		} catch (error) {
			console.error(error);
			return NextResponse.json(
				{ message: "Error creating user" },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ message: "Event not handled" }, { status: 400 });
}
