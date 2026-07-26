import "./globals.css";

export const metadata = {
  title: "LQTM Audit Hub",
  description: "Laboratory quality audit, analysis and CAPA workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
