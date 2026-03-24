'use client';

import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AI-POCUS Conferences Calendar</title>
        <link rel="icon" type="image/svg+xml" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icons/favicon.svg`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, backgroundColor: '#141142', color: '#ffffff' }}>
        {mounted ? (
          <ChakraProvider value={system}>
            {children}
          </ChakraProvider>
        ) : null}
      </body>
    </html>
  );
}
