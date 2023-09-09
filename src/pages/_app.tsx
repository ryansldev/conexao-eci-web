import '@/styles/globals.css'
import {Provider as StyletronProvider} from 'styletron-react';
import { DarkTheme, BaseProvider } from 'baseui';
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [engine, setEngine] = useState<any>(null);

  useEffect(() => {
    // Load the `styletron-engine-atomic` package dynamically.
    // Reason: It requires use of `document`, which is not available
    // outside the browser, so we need to wait until it successfully loads.
    // Source: https://www.gatsbyjs.org/docs/debugging-html-builds/
    import('styletron-engine-atomic').then(styletron => {
      const clientEngine = new styletron.Client();
      setEngine(clientEngine);
    });
  }, []);

  if (!engine) return null;
  
  return (
    <QueryClientProvider client={queryClient}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={DarkTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    </QueryClientProvider>
  )
}
