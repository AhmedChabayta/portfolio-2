import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { StyledEngineProvider } from '@mui/material';
import { Cairo_Play as font } from '@next/font/google';

const alegreyaSans = font({
  subsets: ['latin', 'arabic', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'auto',
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <main className={alegreyaSans.className}>
          {' '}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </StyledEngineProvider>
    </RecoilRoot>
  );
}
