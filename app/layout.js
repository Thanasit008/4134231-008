import './globals.css';

export const metadata = {
  title: 'ระบบจัดการปัญหาน้ำประปาไม่สะอาด',
  description: 'Backend API สำหรับบันทึกและติดตามปัญหาน้ำประปาไม่สะอาด',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
