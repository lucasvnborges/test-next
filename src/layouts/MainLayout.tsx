import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthSessionProvider from "@providers/AuthSessionProvider";
import AntdConfigProvider from "@providers/AntdConfigProvider";
import StyledComponentsRegistry from "@lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocery List - Teste Next.js",
  description: "Web app para cadastro de produtos em uma lista de compras",
  icons: { icon: "/logos/next-icon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <AntdRegistry>
        <AntdConfigProvider>
          <AuthSessionProvider session={session}>
            <body className={inter.className}>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
          </AuthSessionProvider>
        </AntdConfigProvider>
      </AntdRegistry>
    </html>
  );
}
