import type { Metadata } from "next";
import KittenDetailView, { litterMetadata, litterSlugParams } from "@/views/KittenDetailView";

export const revalidate = 3600;

export async function generateStaticParams() {
  return litterSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return litterMetadata("en", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <KittenDetailView locale="en" slug={slug} />;
}
