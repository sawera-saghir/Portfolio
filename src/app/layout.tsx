import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Swera — UI/UX Designer & Creative Web Developer | Portfolio',
  description: 'Digital Product Designer & Creative Full-Stack Web Developer specializing in enterprise SaaS, high-converting digital advisory platforms, and 3D WebGL experiences.',
  keywords: ['UI/UX Designer', 'Web Developer', 'Next.js', 'React', 'Three.js', 'WebGL', 'Tailwind CSS', 'Portfolio'],
  authors: [{ name: 'Swera' }],
  openGraph: {
    title: 'Swera — UI/UX Designer & Creative Web Developer',
    description: 'Designing Digital Experiences That Captivate & Convert.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} dark`}>
      <body className="bg-background text-soft-white font-sans antialiased selection:bg-brand-violet selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
