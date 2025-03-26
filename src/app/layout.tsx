import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Seus Games Favoritos - React & TypeScript Demo",
}

type RootLayoutType = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
