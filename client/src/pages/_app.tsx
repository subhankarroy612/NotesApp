import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
}
