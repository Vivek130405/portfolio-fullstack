import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivek Patil — Full Stack Developer Portfolio",
  description:
    "Premium portfolio of Vivek patil, a Full Stack Developer specializing in Java, Spring Boot, React, and Node.js. Available for hire.",
  keywords: ["Full Stack Developer", "Java Developer", "Spring Boot", "React", "Portfolio"],
  openGraph: {
    title: "Vivek Patil — Full Stack Developer Portfolio",
    description: "Premium portfolio — Full Stack Developer, Java, Spring Boot, React, Node.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
