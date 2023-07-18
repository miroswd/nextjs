import GlobalStyle from "@/styles/GlobalStyle";

export default function MyApp({ Component, pageProps }: any) {
  return  (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
