import "./globals.css";

export const metadata = {
  title: "Quality Management System",
  description: "Laboratory Quality Audit, analysis and CAPA workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
