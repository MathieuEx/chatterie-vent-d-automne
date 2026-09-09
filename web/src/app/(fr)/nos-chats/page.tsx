import type { Metadata } from "next";
import CatsView, { catsMetadata } from "@/views/CatsView";

export const revalidate = 3600;

export const generateMetadata = (): Promise<Metadata> => catsMetadata("fr");

export default function Page() {
  return <CatsView locale="fr" />;
}
