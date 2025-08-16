import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Homepage for the CoursePilot project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-4/5 mt-6">
          <Link href="/my-courses">
            <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
              View My Courses
            </button>
          </Link>
        </div>
        layout
        {children}
      </body>
    </html>
  );
}
