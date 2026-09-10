import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "پت‌اوکیو | فروشگاه تخصصی غذای حیوانات",
  description: "غذای باکیفیت، برند مطمئن و مشاوره تخصصی برای سگ‌ها و گربه‌ها",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fa" dir="rtl"><head><link rel="preload" href="/fonts/Vazirmatn.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>
}
