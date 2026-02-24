import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import { projectService } from "@/services/projectService";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuperList",
  description: "Your workspace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await projectService.getAll().catch(() => []);

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, #252528 0%, #141416 40%, #0e0e10 100%)",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          padding: "8px",
          gap: "4px",
        }}
      >
        <AppSidebar initialProjects={projects} />

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflow: "hidden",
            borderRadius: "12px",
            background: "#1c1c1f",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.10)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}