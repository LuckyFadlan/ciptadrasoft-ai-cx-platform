import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CiptadraSoft | Enterprise IT Solutions & Digital Transformation",
  description:
    "Integrated enterprise software solutions designed to simplify business processes, improve customer experiences, and accelerate digital transformation.",
  keywords: [
    "CiptadraSoft",
    "Enterprise Solutions",
    "Customer Service",
    "Digital Transformation",
    "BPM Automation",
    "CRM Suite",
    "Generative AI",
    "Indonesia Enterprise IT"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
