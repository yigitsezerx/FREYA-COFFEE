import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TVMenu from './TVMenu'; // Yeni oluşturduğumuz TV menüsü dosyasını çağırıyoruz

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Tarayıcıdaki adresi kontrol et (Örn: /tv mi yazıyor?)
const path = window.location.pathname;

// Eğer adres "/tv" ise TV Menüsünü, değilse Ana Uygulamayı (App) göster
if (path === '/tv' || path === '/tv/') {
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
