import '@/app/ui/global.css';
import { epilogue } from './ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafte Haven Home Page',
    default: 'HH Home Page',
  },
  description: 'The official page for Artisans to Showcase their work!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
      <body className={`${epilogue.className} antialiased`}>{children}</body>
    </html>
  );
}
