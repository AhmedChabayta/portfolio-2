import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { NoSsr, StyledEngineProvider } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <RecoilRoot>
        <StyledEngineProvider injectFirst>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledEngineProvider>
      </RecoilRoot>
    </NoSsr>
  );
}
