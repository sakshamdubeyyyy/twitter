import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App.jsx';

import store from './app/store.js';
import { queryClient } from './app/queryClient.js';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer position="top-center" autoClose={3000} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
