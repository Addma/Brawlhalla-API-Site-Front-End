import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Router from './router';
import './index.css';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<RouterProvider router={Router()} />
    );