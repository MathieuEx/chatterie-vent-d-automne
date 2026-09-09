import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_CONFIG } from "@/lib/site-config";

export const alt = SITE_CONFIG.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #EFE6DA 0%, #DBC19E 55%, #C89C63 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={220}
          height={220}
          style={{ borderRadius: "50%", border: "8px solid #F5F1EB" }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 600,
            color: "#5A371F",
            textAlign: "center",
          }}
        >
          La Chatterie des Vents d&apos;Automne
        </div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#8A633E" }}>
          {SITE_CONFIG.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
