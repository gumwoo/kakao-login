// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        // 글로벌 에러 핸들링 로직
        console.error('Global Query Error:', error);
        toast.error(`오류가 발생했습니다: ${error.message}`);
      },
    },
  },
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
