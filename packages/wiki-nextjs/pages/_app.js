import '../styles/globals.css';
import App from 'next/app';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../styletron';
import { AuthProvider } from '../lib/auth';
import { RrfProvider } from '../lib/store';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <AuthProvider>
            <RrfProvider>
              <Component {...pageProps} />
            </RrfProvider>
          </AuthProvider>
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
