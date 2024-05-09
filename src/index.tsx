import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

root.render(
  <React.StrictMode>
     <MantineProvider theme={theme}>
      <App />
     </MantineProvider>
  </React.StrictMode>
);
