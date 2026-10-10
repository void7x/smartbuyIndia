import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/decision-cards.css';
import './styles/maximalist-theme.css';

const container = document.getElementById('root');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
