import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { StyledEngineProvider } from '@mui/material';
import { Roboto } from '@next/font/google';

const ROBOTO = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700', '900', '100'],
  display: 'auto',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <main className={` `}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </StyledEngineProvider>
    </RecoilRoot>
  );
}
