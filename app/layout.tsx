import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const robotoHeading = Roboto({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Shopping App",
  description: "My Custom Shopping App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full m-0",
        "antialiased",
        "font-sans",
        robotoHeading.variable,
      )}
    >
      <body className="min-h-full m-0 flex flex-col">
        <main className="max-w-1399px px-2 lg:px-4">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
