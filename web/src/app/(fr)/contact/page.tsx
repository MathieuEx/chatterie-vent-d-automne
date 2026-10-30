import type { Metadata } from "next";
import ContactView, { contactMetadata } from "@/views/ContactView";

export const generateMetadata = (): Promise<Metadata> => contactMetadata("fr");

export default function Page() {
  return <ContactView locale="fr" />;
}
