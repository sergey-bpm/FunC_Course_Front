//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// // this manifest is used temporarily for development purposes
const manifestUrl = 'https://raw.githubusercontent.com/sergey-bpm/FunC_Course_Front/78153ec20b668d621dea756f1a8046c490696912/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)

// const manifestUrl = 'https://raw.githubusercontent.com/sergey-bpm/FunC_Course_Front/78153ec20b668d621dea756f1a8046c490696912/tonconnect-manifest.json';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <>
//     <link rel="manifest" href="tonconnect-manifest.json" crossOrigin="use-credentials" />
//     <TonConnectUIProvider manifestUrl={manifestUrl}>
//       <App />
//     </TonConnectUIProvider>
//   </>,
// );
