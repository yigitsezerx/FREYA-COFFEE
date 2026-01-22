import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TVMenu from './TVMenu';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// HEM normal yolu (/tv) HEM DE güvenli yolu (#tv) kontrol et
const path = window.location.pathname;
const hash = window.location.hash; // URL'deki # işaretini okur

// Eğer adres "/tv" ise YA DA adresin sonunda "#tv" varsa TV Menüsünü aç
if (path === '/tv' || path === '/tv/' || hash === '#tv') {
  root.render(
    <React.StrictMode>
      <TVMenu />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
