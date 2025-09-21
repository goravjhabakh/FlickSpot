import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FlickSpot',
  description: 'Simple socially media app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className='min-h-screen'>
                <Navbar/>
                <main className='py-8'>
                  {/* Container to center the content */}
                  <div className='max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                      <div className='hidden lg:block lg:col-span-3'>
                        sidebar
                      </div>
                      <div className='lg:col-span-9'>
                        {children}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
  )
}