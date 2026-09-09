import type { Metadata } from "next";
import KittensView, { kittensMetadata } from "@/views/KittensView";

export const revalidate = 3600;

export const generateMetadata = (): Promise<Metadata> => kittensMetadata("en");

export default function Page() {
  return <KittensView locale="en" />;
}
