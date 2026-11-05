// src/app/api/revalidate/route.ts
//
// On-demand revalidacija za Sanity webhook.
// Umjesto da se stranice regeneriraju svake minute (puno ISR writeova),
// cache se osvježava samo kad se sadržaj u Sanityju stvarno promijeni.
//
// Postavljanje (Sanity → API → Webhooks → Create webhook):
//   URL:        https://www.arctis.hr/api/revalidate
//   Dataset:    production
//   Trigger on: Create, Update, Delete
//   Filter:     _type in ["post", "successStories", "references", "archibusProducts"]
//   Projection: { _type, "slug": slug.current }
//   HTTP method: POST
//   Secret:     ista vrijednost kao SANITY_REVALIDATE_SECRET env varijabla na Vercelu

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string | null;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true, // pričekaj da Content Lake bude konzistentan prije revalidacije
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const tags = [body._type];
    if (body.slug) tags.push(`${body._type}:${body.slug}`);

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({ revalidated: true, tags, now: Date.now() });
  } catch (error) {
    console.error("Revalidation webhook error:", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
