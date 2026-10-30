import type { Metadata } from "next";
import HomeView, { homeMetadata } from "@/views/HomeView";

export const generateMetadata = (): Promise<Metadata> => homeMetadata("fr");

export default function Page() {
  return <HomeView locale="fr" />;
}
