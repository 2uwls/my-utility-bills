'use client';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { useEffect } from 'react';
import { getFCMToken } from '@/lib/firebase';

import { TooltipProvider } from '@/components/ui/tooltip';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const firebaseConfig = encodeURIComponent(
        JSON.stringify({
          apiKey: 'AIzaSyCRx8zpjYJ2bprASpbdoJk7BJa2t6tK9aM',
          authDomain: 'my-utility-bills-1596d.firebaseapp.com',
          projectId: 'my-utility-bills-1596d',
          storageBucket: 'my-utility-bills-1596d.firebasestorage.app',
          messagingSenderId: '891644921414',
          appId: '1:891644921414:web:f6913f28e137ac0df6ec47',
          measurementId: 'G-LEB3B56RBY',
        })
      );
      navigator.serviceWorker
        .register(`/firebase-messaging-sw.js?firebaseConfig=${firebaseConfig}`, {
          type: 'module',
        })
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>내공과금</title>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="icon" href="/images/trees/large-tree.png" />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
