import type { Metadata } from "next";
import "./globals.css";
import "./trade.css";
import "./equipment.css";
import "./equipment-images.css";

export const metadata: Metadata = {
  title: { default: "ACM | Pure Life Services", template: "%s | ACM" },
  description: "Family-owned HVAC service for Florida homes and light commercial properties. Honest diagnostics, careful repairs, and dependable maintenance — 10 years in the trade.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://acmpurelife.com"),
  openGraph: { title: "ACM | Pure Life Services — HVAC Repair, Maintenance & Installation", description: "Family-owned HVAC service for Florida homes and light commercial properties. Honest diagnostics and careful repairs, built on 10 years in the trade.", images: ["/og.png"], url: "https://acmpurelife.com", siteName: "ACM Pure Life Services", type: "website" },
  alternates: { canonical: "/" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
