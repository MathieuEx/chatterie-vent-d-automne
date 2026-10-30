import type { Metadata } from "next";
import KittensView, { kittensMetadata } from "@/views/KittensView";

export const generateMetadata = (): Promise<Metadata> => kittensMetadata("fr");

export default function Page() {
  return <KittensView locale="fr" />;
}
