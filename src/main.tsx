//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// // this manifest is used temporarily for development purposes
// const manifestUrl = 'https://sergey-bpm.github.io/FunC-Course-Front/tonconnect-manifest.json';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <TonConnectUIProvider manifestUrl={manifestUrl}>
//     <App />
//   </TonConnectUIProvider>,
// )

const manifestUrl = 'https://sergey-bpm.github.io/FunC-Course-Front/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <link rel="manifest" href="tonconnect-manifest.json" crossOrigin="use-credentials" />
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </>,
);
