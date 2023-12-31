import Navbar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Poppins } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: 'Find Your Rent',
  description: 'Dont Wait! Just Rent!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={poppins.className}>
        <MantineProvider>
          <Notifications />
          <Navbar />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}