import type { Metadata } from "next";
import LayoutShell, { shellMetadata } from "@/lib/layout-shell";
import "../globals.css";

export const generateMetadata = (): Promise<Metadata> => shellMetadata("fr");

export default function FrenchRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LayoutShell locale="fr">{children}</LayoutShell>;
}
