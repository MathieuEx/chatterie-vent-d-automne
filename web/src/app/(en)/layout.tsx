import type { Metadata } from "next";
import LayoutShell, { shellMetadata } from "@/lib/layout-shell";
import "../globals.css";

export const generateMetadata = (): Promise<Metadata> => shellMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LayoutShell locale="en">{children}</LayoutShell>;
}
