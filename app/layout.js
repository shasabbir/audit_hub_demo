import "./globals.css";

export const metadata = {
  title: "Quality Management System",
  description: "Laboratory quality audit, analysis and CAPA workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
