import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { StyledEngineProvider } from '@mui/material';
import { Cairo_Play as font } from '@next/font/google';

const FONT = font({
  subsets: ['latin', 'arabic', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'auto',
  variable: '--font-cairo',
  fallback: ['Roboto'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <main className={`${FONT.variable} font-cairo`}>
          {' '}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </StyledEngineProvider>
    </RecoilRoot>
  );
}
