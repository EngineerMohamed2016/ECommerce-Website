export const dynamic = 'force-dynamic'
import './globals.css'
import { Roboto_Flex } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CntxProviderLazy from '@/components/CntxProviderLazy'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const roboto = Roboto_Flex({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Home',
  description: 'Xperia | E-Commerce Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} min-h-screen flex flex-col`}>
        <CntxProviderLazy>
          <Navbar />
          {children}
          <div className='mt-auto'><Footer /></div>
        </CntxProviderLazy>

        <ToastContainer />
      </body>
    </html>
  )
}
