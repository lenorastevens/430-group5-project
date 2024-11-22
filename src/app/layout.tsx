/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import { epilogue } from './ui/fonts';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300&family=Sancreek&display=swap" 
          rel="stylesheet"  
        />
      </head>
      <body className={epilogue.className}>{children}</body>
    </html>
  );
}
