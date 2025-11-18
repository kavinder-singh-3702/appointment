import './globals.css';

export const metadata = {
  title: 'Appointment Management',
  description: 'Minimal appointment workflow demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
