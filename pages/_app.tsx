import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
<<<<<<< Updated upstream
=======
import { NoSsr, StyledEngineProvider } from '@mui/material';
import { Roboto } from '@next/font/google';
>>>>>>> Stashed changes

export default function App({ Component, pageProps }: AppProps) {
  return (
<<<<<<< Updated upstream
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
=======
    <NoSsr>
      <RecoilRoot>
        <StyledEngineProvider injectFirst>
          <main className={`${ROBOTO.variable} font-roboto `}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </StyledEngineProvider>
      </RecoilRoot>
    </NoSsr>
>>>>>>> Stashed changes
  );
}
