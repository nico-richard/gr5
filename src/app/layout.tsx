import "@/styles/global.sass";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/icons/mountain.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
