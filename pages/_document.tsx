import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full">
      <Head />
      <body className="flex items-start justify-center h-full bg-gradient-to-bl from-violet-900 to-teal-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
