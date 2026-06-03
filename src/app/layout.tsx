import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes, Dancing_Script } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import ClientProviders from '@/components/ClientProviders';
import { getAllPhotoSrcs } from '@/lib/photos';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-greatvibes',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Through the Years · a memory archive',
  description: 'A personal archive of moments, memories, and the story of love — kept, year by year.',
  openGraph: {
    title: 'Through the Years',
    description: 'A personal archive of moments worth keeping.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const allPhotos = getAllPhotoSrcs();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${dancing.variable}`}
    >
      <body className="font-serif">
        <ClientProviders>
          <SplashScreen photos={allPhotos} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
