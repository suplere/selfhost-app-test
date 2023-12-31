import Navigation from '@components/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app">
          <Navigation />
          <div className="container p-4 mx-auto mt-8 antialiased">{children}</div>
        </div>
      </body>
    </html>
  )
}
