import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { colors } from '../config';

interface Props {
  styles: string;
  locale: string;
  localeDataScript: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(context: NextDocumentContext) {
    // styled-components
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);
    // react-intl

    const {
      // @ts-ignore
      req: { locale, localeDataScript },
    } = context;

    return {
      ...initialProps,
      locale,
      localeDataScript,
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    const { locale, styles, localeDataScript } = this.props;
    const features = ['default', 'Intl', `Intl.~locale.${locale}`].join();
    const encodedFeatures = encodeURIComponent(features);
    const polyfill = `https://polyfill.io/v3/polyfill.min.js?flags=gated&features=${encodedFeatures}`;

    return (
      <html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/safari.svg"
            color={colors.primary}
          />
          <meta name="theme-color" content={colors.primary} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="shortcut icon" href="/static/images/logo/logo.png" />
          <link rel="shortcut icon" href="/static/images/logo/logo.ico" />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="228x228"
            href="/static/images/logo/logo-228.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="195x195"
            href="/static/images/logo/logo-195.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/static/images/logo/logo-152.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/static/images/logo/logo-144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="128x128"
            href="/static/images/logo/logo-128.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/static/images/logo/logo-120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="96x96"
            href="/static/images/logo/logo-96.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/static/images/logo/logo-72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/images/logo/logo-57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/images/logo/logo-32.png"
            sizes="32x32"
          />
          <link
            rel="alternate"
            href="/atom"
            type="application/atom+xml"
            title="RSS Feed"
          />
          <link
            rel="alternate"
            href="/feed.json"
            type="application/json"
            title="JSON Feed"
          />
          {styles}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <script src={polyfill} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
