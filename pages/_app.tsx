import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { StyledEngineProvider } from '@mui/material';
import { Roboto } from '@next/font/google';

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
    <StyledEngineProvider injectFirst>
      <RecoilRoot>
        <main className={`${ROBOTO.variable} font-roboto `}>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </StyledEngineProvider>
  );
}
