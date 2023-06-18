import { UserProvider } from '@/context/userContext'
import '@/styles/globals.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'




export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      {/* <UserProvider>
      </UserProvider>  */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
