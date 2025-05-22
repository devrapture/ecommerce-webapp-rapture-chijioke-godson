import MainLayout from "@/components/main-layout";
import Provider from "@/components/provider";
import { siteConfig } from "@/config/site";
import { poppins } from "@/lib/fonts";
import "@/styles/globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Toaster } from "sonner";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`,
  },
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poppins.className}`}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <Toaster position="top-center" />
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
}
