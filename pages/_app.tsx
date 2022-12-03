import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { StyledEngineProvider } from '@mui/material';
import { Roboto } from '@next/font/google';

// const FONT = Cairo_Play({
//   subsets: ['latin', 'arabic', 'latin-ext'],
//   weight: ['400', '500', '600', '700'],
//   display: 'auto',
//   variable: '--font-cairo',
//   fallback: ['Roboto'],
// });
const ROBOTO = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700', '900', '100'],
  display: 'auto',
  variable: '--font-roboto',
  fallback: ['Roboto'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <main className={`${ROBOTO.variable} font-roboto`}>
          {' '}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </StyledEngineProvider>
    </RecoilRoot>
  );
}
