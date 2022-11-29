import Head from 'next/head';

export default function MetaTags() {
  return (
    <>
      <Head>
        <title>Ahmed Chabayta Front-End Web-Developer: Portfolio</title>
        {/* Primary Meta Tags  */}
        <meta
          name="title"
          content="Ahmed Chabayta Front-End Web-Developer: Portfolio"
        />
        <meta
          name="description"
          content="Self taught web developer, focused on ReactJs, NextJs"
        />
        {/*  Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://portfolio-2-beryl.vercel.app/"
        />
        <meta
          property="og:title"
          content="Ahmed Chabayta Front-End Web-Developer: Portfolio"
        />
        <meta
          property="og:description"
          content="Self taught web developer, focused on ReactJs, NextJs"
        />
        <meta property="og:image" content="/screenshot.png" />
        {/* twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://portfolio-2-beryl.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="Ahmed Chabayta Front-End Web-Developer: Portfolio"
        />
        <meta
          property="twitter:description"
          content="Self taught web developer, focused on ReactJs, NextJs"
        />
        <meta property="twitter:image" content="/screenshot.png"></meta>
      </Head>
    </>
  );
}
const BASE = process.env.NEXT_PUBLIC_BASE_URL;
