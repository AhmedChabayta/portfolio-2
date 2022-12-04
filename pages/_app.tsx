import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { Roboto } from '@next/font/google';
import { Layout } from '../components';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const ROBOTO = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700', '900', '100'],
  display: 'auto',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Layout>
          <main className={`${ROBOTO.variable} font-roboto `}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </RecoilRoot>
    </>
  );
}
