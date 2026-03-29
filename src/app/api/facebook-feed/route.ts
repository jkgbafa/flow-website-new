import { NextResponse } from "next/server";

// Set these in Vercel Environment Variables:
// FACEBOOK_PAGE_ID = "100084941564133"  (The Flow Church)
// FACEBOOK_PAGE_ACCESS_TOKEN = "<your-page-access-token>"

const PAGE_ID = process.env.FACEBOOK_PAGE_ID || "100084941564133";
const ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";

interface FacebookPost {
  id: string;
  message: string;
  full_picture?: string;
  created_time: string;
  permalink_url: string;
}

function extractTitle(message: string): string {
  // Facebook blog posts typically have the title in the first line(s)
  // Often formatted as: "FLOW Prayer Meeting | S12•E16\nTitle Here\n..."
  const lines = message.split("\n").filter((l) => l.trim());
  // Return first 2 non-empty lines as the title
  return lines.slice(0, 2).join(" — ").substring(0, 120);
}

function extractEpisode(message: string): string {
  const match = message.match(/S(\d+)\s*[•·.]\s*E(\d+)/i);
  return match ? `S${match[1]} E${match[2]}` : "";
}

export async function GET() {
  if (!ACCESS_TOKEN) {
    return NextResponse.json(
      {
        error: "Facebook Page Access Token not configured",
        setup: "Add FACEBOOK_PAGE_ACCESS_TOKEN to Vercel Environment Variables",
      },
      { status: 501 }
    );
  }

  try {
    const fields = "message,full_picture,created_time,permalink_url";
    const url = `https://graph.facebook.com/v19.0/${PAGE_ID}/posts?fields=${fields}&limit=10&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const posts = (data.data as FacebookPost[])
      .filter((p) => p.message && p.message.includes("FLOW"))
      .map((p) => ({
        id: p.id,
        title: extractTitle(p.message),
        episode: extractEpisode(p.message),
        image: p.full_picture || "",
        date: new Date(p.created_time).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        facebookUrl: p.permalink_url,
        fullMessage: p.message,
      }));

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
