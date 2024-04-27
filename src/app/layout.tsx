import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Context from './Context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | CryptoScout',
    default: 'CryptoScout',
  },
  description: 'A place to learn about cryptocurrency',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' cursor-default'}>
        <Context>
          <Navbar />
          {children}
          <Footer />
        </Context>
      </body>
    </html>
  )
}
