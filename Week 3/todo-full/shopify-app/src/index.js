import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@shopify/polaris/build/esm/styles.css"
import en from "@shopify/polaris/locales/en.json"
import { AppProvider } from '@shopify/polaris';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider i18n={en}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);