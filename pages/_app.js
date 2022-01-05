import '../styles/globals.css';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import { store } from '../redux/store';
import { useState, useEffect } from 'react';
import Wait from '../components/wait';
import Router from 'next/router';
import { NextSeo } from 'next-seo';

if (typeof window !== 'undefined') {
  const hours = 6;
  const now = Date.now();
  const setupTime = localStorage.getItem('version');
  if (setupTime == null) {
    localStorage.clear();
    localStorage.setItem('version', now);
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem('version', now);
  }
}

function MyApp({ Component, pageProps }) {
  const store = useStore();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('findished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <NextSeo
        title="Технические оборудования в разновидности | Kvant"
        description="Интернет-магазин BloomShop предлагает вам купить крема, гели, лосьоны и другие предметы гигиенты по уходу за лицом и телом."
        openGraph={{
          images: [{ url: '/og-mage.jpg' }],
          url: 'https://kvant.uz/',
          title: 'Технические оборудования в разновидности | Kvant',
          site_name: 'Kvant',
          locale: 'ru_RU',
          type: 'website',
          description:
            'Интернет-магазин Kvant предлагает вам купить широкомасштабные технические оборудований.',
        }}
      />
      <Head>
        <link rel="shortcut icon" type="image/jpg" href="favicon.ico" />

        {process.env.NODE_ENV === 'production' ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(83589079, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
   });
                        `,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
                       <div><img src="https://mc.yandex.ru/watch/75430372" style="position:absolute; left:-9999px;" alt="" /></div>
                        `,
              }}
            />
          </>
        ) : null}
      </Head>
      {loading ? (
        <Wait />
      ) : (
        <PersistGate persistor={store.__persistor}>
          {() => <Component {...pageProps} />}
        </PersistGate>
      )}
    </>
  );
}

export default store.withRedux(MyApp);
