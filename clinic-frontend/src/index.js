import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { WebSocketProvider } from './WebSocketContext';
import * as process from 'process';

window.global = window;
window.process = process;
window.Buffer = [];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <WebSocketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </WebSocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

