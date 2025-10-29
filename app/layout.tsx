import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentic Relay',
  description:
    'Autonomous content engine that transforms Telegram prompts into ready-to-publish social media posts.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
      </body>
    </html>
  );
}
