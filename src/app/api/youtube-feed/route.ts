import { NextResponse } from "next/server";

const PLAYLIST_ID = "PL1BUfT-Z6j-RlXh1ad9CnOhcM1xW2d5Jr";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

export async function GET() {
  try {
    const res = await fetch(PLAYLIST_URL, {
      next: { revalidate: 300 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });
    const html = await res.text();

    // Extract video IDs from playlist page in order
    const videoIds: string[] = [];
    const regex = /"videoId":"([^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      if (!videoIds.includes(id)) {
        videoIds.push(id);
      }
      if (videoIds.length >= 5) break;
    }

    const latestVideoId = videoIds[0] || "";

    return NextResponse.json({
      latestVideoId,
      videoIds,
    });
  } catch {
    return NextResponse.json(
      { latestVideoId: "", videoIds: [] },
      { status: 500 }
    );
  }
}
