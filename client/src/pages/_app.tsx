import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import axios from 'axios'
import AuthContext from '@/contextAPI/AuthContext'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = 'http://localhost:8080/'

export interface contextType {
  isAuth: boolean,
  token: string | null,
  setAuth: Function,
  setToken: Function
}

export default function App({ Component, pageProps }: AppProps) {

  const [token, setToken] = useState<string | null>('')
  const [isAuth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    setToken(localStorage.getItem('NotesApp'))
    setAuth(!!localStorage.getItem('NotesApp'))
  }, [])

  return <>
    <ChakraProvider>
      <AuthContext.Provider value={{ isAuth, token, setToken, setAuth }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ChakraProvider>
  </>
}
