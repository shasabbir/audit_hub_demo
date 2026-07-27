import "./globals.css";

export const metadata = {
  title: "LABORATORY QUALITY THINKING MODEL (LQTM)",
  description: "Laboratory quality audit, analysis and CAPA workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
