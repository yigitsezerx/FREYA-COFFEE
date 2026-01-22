import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// DÜZELTME BURADA YAPILDI: './TVMenu' yerine './components/TVMenu'
import TVMenu from './components/TVMenu'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Hash (#) veya Path (/) kontrolü
const path = window.location.pathname;
const hash = window.location.hash;

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
