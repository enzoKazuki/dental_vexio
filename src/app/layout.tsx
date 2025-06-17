import { Providers } from "@/providers";
import "@/style/sass/global.scss";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-br">
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
