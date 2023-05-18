import "../styles/globals.css";
import "../firebase/client.js"
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
  <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"></link>
    <Script 
      strategy="afterInteractive" 
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
    <Script
      strategy="afterInteractive"
      crossorigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1856080679998045`}
    />
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=G-7K32FX1NCM`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-7K32FX1NCM');
        `,
      }}
    />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
