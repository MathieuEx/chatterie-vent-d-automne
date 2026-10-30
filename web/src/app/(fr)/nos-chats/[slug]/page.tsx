import type { Metadata } from "next";
import CatDetailView, { catMetadata, catSlugParams } from "@/views/CatDetailView";

export async function generateStaticParams() {
  return catSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return catMetadata("fr", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CatDetailView locale="fr" slug={slug} />;
}
