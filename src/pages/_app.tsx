import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
          font-weight: 400;
          font-size: 1rem;
          background: rgb(244 244 245);
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
