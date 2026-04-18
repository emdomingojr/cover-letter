import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const { env } = await getCloudflareContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bucket = (env as any).WEBFLOW_CLOUD_MEDIA;

  if (!bucket) {
    return new Response("Storage not configured", { status: 503 });
  }

  const rangeHeader = request.headers.get("range");
  let range: { offset: number; length: number } | undefined;

  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const offset = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : undefined;
      range = { offset, length: end !== undefined ? end - offset + 1 : 1024 * 1024 };
    }
  }

  const object = await bucket.get(key, range ? { range } : undefined);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const contentType = object.httpMetadata?.contentType || "video/mp4";
  const headers = new Headers({
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  });

  if (range && object.range) {
    const r = object.range as { offset: number; length: number };
    const end = r.offset + r.length - 1;
    headers.set("Content-Range", `bytes ${r.offset}-${end}/${object.size}`);
    headers.set("Content-Length", String(r.length));
    return new Response(object.body as ReadableStream, { status: 206, headers });
  }

  headers.set("Content-Length", String(object.size));
  return new Response(object.body as ReadableStream, { status: 200, headers });
}
