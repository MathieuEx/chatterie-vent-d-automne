import type { Metadata } from "next";
import NewsView, { newsMetadata } from "@/views/NewsView";

export const generateMetadata = (): Promise<Metadata> => newsMetadata("fr");

export default function Page() {
  return <NewsView locale="fr" />;
}
