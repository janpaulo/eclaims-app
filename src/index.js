import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap your App component with SnackbarProvider */}
    <SnackbarProvider
      maxSnack={3} // Maximum number of snackbars to show at once
      anchorOrigin={{
        vertical: 'bottom', // Position the snackbar at the bottom of the screen
        horizontal: 'left', // Position it on the left side of the screen
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
