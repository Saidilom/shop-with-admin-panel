import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Строительная компания",
  description: "Профессиональная строительная компания. Качественные материалы и инструменты для строительства",
    generator: 'unllim'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <AppProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
