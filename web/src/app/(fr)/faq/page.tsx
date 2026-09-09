import type { Metadata } from "next";
import FaqView, { faqMetadata } from "@/views/FaqView";

export const revalidate = 3600;

export const generateMetadata = (): Promise<Metadata> => faqMetadata("fr");

export default function Page() {
  return <FaqView locale="fr" />;
}
