import type { Metadata } from "next";
import  {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: {
    template : "%s - AI Resume Builder", // if we are in a sub page the name will be for exp : login - ai resume builder  
    absolute : "AI Resume Builder" // if we are in the main page the name will be ai resume builder  
                                    // ( the name on the top of the url link of teh page in teh browser behinf the favicon.ic image ( in the app folder))
  },
  description: "AI Resume Builder is the easiest way to create a professional Resume that will help you land your dream job ...  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
