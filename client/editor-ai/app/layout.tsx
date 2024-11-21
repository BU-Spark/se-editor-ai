import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";

// @ts-ignore
import Header from "./components/Header.tsx";
import { AuthProvider } from './context/AuthContext';

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Editor AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>\
          <Header />
           <div style={{ paddingTop: '90px' }}> 
           {children}
          </div>
        </AuthProvider>      
      </body>
    </html>
  );
}