
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const isLoadingLogoExperiment = new URLSearchParams(window.location.search).get('experiment') === 'loading-logo';
const LoadingLogoExperiment = React.lazy(() => import('./experiments/loading-logo/LoadingLogoExperiment'));

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {isLoadingLogoExperiment ? (
        <React.Suspense fallback={null}><LoadingLogoExperiment /></React.Suspense>
      ) : <App />}
    </ThemeProvider>
  </React.StrictMode>
);
