import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import Perspective from "perspective-api-client";
import { AnalyzeResult } from "perspective-api-client";

const serviceAccountKey = {
	type: "service_account",
	project_id: "joyspot-425602",
	private_key_id: "497feb5dd6c8d426507e3651f02e761a0c7ef7d7",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDeAz8VEMpNILhE\nlZn6kN0DMuWIl/VJDglO7A3dzyAauKbiK68pkuB7F2YOlfRfYuAaJ+ytEFtIC/mb\nj4RTMHXzyOUfL8wAt2VAIAIxBscVXbndirf8LXAPvcj9yzrYdmif/oaaP+0FnAu9\n9GRyMdhJGl9PPu3krqb1oOuahI6GFTcSVVOlMUzD8dzTV378E954sRcNy44YIP9f\nwU4/9HCL7Tzw9O7WfuyvsTI49KNjlETl5I87yfkWA7oBfjQp7oq7BlB6nnSSaTGC\n7JI259QOZ9GgqvwJglgA20zEgM/9b1lJlVs56X9U9qh/aryTgu8HCYlMucInWFAw\n7bl2f76BAgMBAAECggEAAnxvEgdxen5frd3uftqtLOZeoWJRO/eRJV35lEan3YC8\nlqsGT7z+MEatbQOjHEfVSlmw2enFWefPbF1lrhBMe9W/shMVEdt74eVR3PZuV4gI\nhylw4L0qBHUbuXLThn3B82u0WmkVmILcM0z3rHswKLZnw5GI9K77fePmy4DJP0lb\ncEq1+qQ73JNA3fUo1Ynao0B97G1PhFD8VQWAK6TLo2EwLe7dX2AHR2UDgnQ1idnu\nfyYGmDc6TIGcrHmrf/LYOY1YRUhIW/qBTCkx1sEcP21uctvdV3nVhe93/XXYR0hc\nhAyI6rKp3ZYC55TdTWSBCTMkZJaysnvJD4UKC0poyQKBgQD2bVOjy+w9wFK/fomU\neGFFPCsV+OG8djfYqPI0FLiuPhtDTyzP00Rt4MCuk5cEzIxSyD70qJ/ElC3b2UYS\nRuxUaE5J5ouVDM0qvGzRw/6Tdc+lEziubrEJunRgvJOlSbWYQRy66jFWZSNGqNjS\nAcrG6uXBOjdzJ5MlWAdHfAzAOQKBgQDmox+BPmaW0gwO0x3IyHB6EOruJGX6wCCm\nsJacid3H6VRf4o/lXxfoOfkM7FIRKR2KDF8vfGv/qhz3jEIVM0A+eDGzE2EX2sWo\ny0xXr5UNTezaWDozrBxZTNCOp9Y8JJFnPWOTzZOY9MCXkdfaseErZXakBLLIrbaW\nkuydYVPgiQKBgClMIxM1Lo8etv9ejmHyVqLKtZHGFtaFnVBS59wwiM6ym9EI6MKf\nbj1XyBK5qzpjqTSKWHqZ88R27MSGQgb4Gcz/efdKiqPc9FkwILB6vyQpPzYz5XDe\nHg86TxyTHc86bhNo/g6ZBtGqu2GxFD0Fjd0OKpjaT8adoDxG51lkgaKJAoGAXghj\n7+3hJdy9zc2FdzdBpIMBRdbRPUrYBR46Sdhr8/XN0MouoPYEaUo5oGs5ioWY5Y/l\nvxabccGJzeQBjWM37kBTAxADphYsQIWiup17x9DdoKgYErk5Va9b2M3VKvA92DnP\nP5OxectQOnvb5e5gP7E+jeDcg7VPnFSK5B+qcwECgYEAvbB8cuX/9EkY/yVQMAll\nw5XS1KNF0FJ+vYuyMBmmL1x9uVYgn8eFVQuq4DdIAwI21QoW21CXKwcfs4HqyhmX\n0nDp99MnI6GzUqm+qQ3Z/U7lqptOBBUc1vGsSGQCr6gyG12JN0SglWHAct7o/K3l\nnvSDqVa/TZ6fKqKwijYzB5I=\n-----END PRIVATE KEY-----\n",
	client_email: "joyspot-toxic@joyspot-425602.iam.gserviceaccount.com",
	client_id: "103078567276723920633",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/joyspot-toxic%40joyspot-425602.iam.gserviceaccount.com",
};

const auth = new GoogleAuth({
	credentials: serviceAccountKey,
	scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

async function getPerspectiveClient() {
	const client = await auth.getClient();
	return new Perspective({ authClient: client });
}

export async function POST(request: NextRequest) {
	const { content } = await request.json();

	if (!content) {
		return NextResponse.json({
			success: false,
			message: "Content is required",
		});
	}

	try {
		const perspective = await getPerspectiveClient();
		const result: AnalyzeResult = await perspective.analyze(content);
		const toxicityScore =
			result.attributeScores.TOXICITY.summaryScore.value;

		if (toxicityScore > 0.7) {
			return NextResponse.json({
				success: false,
				message: "Post is too toxic",
			});
		}

		return NextResponse.json({
			success: true,
			message: "Post is acceptable",
		});
	} catch (error) {
		console.error("Error analyzing content:", error);
		return NextResponse.json({
			success: false,
			message: "Error analyzing content",
		});
	}
}
