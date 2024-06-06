export type WebhookEvent = {
	data: UserData;
	object: "event";
	type: "user.created" | "user.updated" | string;
};

export type UserData = {
	id: string;
	email_addresses: { email_address: string }[];
	first_name: string;
	last_name: string;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};
