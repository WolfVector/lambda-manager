import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white height-div rounded-lg shadow-2xl m-8">
          <div className='p-3'>
            <div className="flex justify-between">
              <div className='text-2xl font-bold'>Directory</div>
              <Image alt='Logo' height={150} width={150} src="/img/LambdaManager2.png" />
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
