import { NextResponse } from "next/server";

export async function GET() {
  const secret = process.env.BOT_DIRECT_LINE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Bot not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      "https://directline.botframework.com/v3/directline/tokens/generate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "Token generation failed", detail: err }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ token: data.token });
  } catch {
    return NextResponse.json({ error: "Failed to connect to bot service" }, { status: 502 });
  }
}
