import type { Metadata } from "next";
import NewsDetailView, { articleMetadata, articleSlugParams } from "@/views/NewsDetailView";

export const revalidate = 3600;

export async function generateStaticParams() {
  return articleSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("fr", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsDetailView locale="fr" slug={slug} />;
}
