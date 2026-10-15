import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { initializeDatabase } from './database/db';
import './styles/index.css';

registerSW({ immediate: true });

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento raiz do GYMRATS não encontrado.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <div className="loading" role="status" aria-live="polite">
    Preparando seu treino…
  </div>,
);

async function bootstrap() {
  try {
    await initializeDatabase();
    root.render(
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('Falha ao preparar o banco local do GYMRATS.', error);
    root.render(
      <main className="startup-error">
        <span className="eyebrow">NÃO FOI POSSÍVEL INICIAR</span>
        <h1>Seus dados continuam seguros.</h1>
        <p>Feche e abra o app novamente. Se o problema continuar, confira o armazenamento do Safari.</p>
        <button className="primary" onClick={() => location.reload()}>
          TENTAR NOVAMENTE
        </button>
      </main>,
    );
  }
}

void bootstrap();
