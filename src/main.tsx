import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';
import { PopulateBusData } from './utils/data';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

PopulateBusData('1');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
