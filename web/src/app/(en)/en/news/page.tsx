import type { Metadata } from "next";
import NewsView, { newsMetadata } from "@/views/NewsView";

export const revalidate = 3600;

export const generateMetadata = (): Promise<Metadata> => newsMetadata("en");

export default function Page() {
  return <NewsView locale="en" />;
}
