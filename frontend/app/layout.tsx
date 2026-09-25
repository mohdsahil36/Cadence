import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cadence",
  description: "Engineering activity intelligence",
};

/** Login-only: paint theme bg before hydrate (pairs with suppressHydrationWarning). */
const loginThemeBoot = `(function(){try{if(location.pathname.indexOf("/login")!==0)return;var s=localStorage.getItem("nocta-theme");var h=new Date().getHours();var dark=s==="dark"||(s!=="light"&&(h>=17||h<7));var c=dark?"#0e1219":"#e8eef5";document.documentElement.classList.toggle("dark",dark);document.documentElement.style.backgroundColor=c;var b=document.body;if(b)b.style.backgroundColor=c;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans"
      >
        <Script id="nocta-login-theme" strategy="beforeInteractive">
          {loginThemeBoot}
        </Script>
        {children}
      </body>
    </html>
  );
}
