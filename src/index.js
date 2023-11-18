import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import WelcomeView from './views/welcome/WelcomeView';
import ScannerView from './views/scanner/MainView';
import ResultsView from './views/results/ResultsView';
import HistoryView from './views/history/HistoryView';
import ProfileView from './views/profile/ProfileView';
import { ROUTES } from './miscellanous/Constants';
import ErrorPage from './errors/ErrorPage';

// FYI https://reactrouter.com/en/main/start/tutorial

const router = createBrowserRouter([
  {
    path: ROUTES.WELCOME,
    element: <WelcomeView />,
    // FYI: https://reactrouter.com/en/main/route/error-element
    errorElement: <ErrorPage />
  },
  {
    path: ROUTES.SCANNER,
    element: <ScannerView />,
    errorElement: <ErrorPage />
    // FYI for fetching data from backend we can use `loader` https://reactrouter.com/en/main/route/loader
    // or we can simply use useEffect in `...View` components
  },
  {
    path: ROUTES.RESULTS,
    element: <ResultsView />,
    errorElement: <ErrorPage />
  },
  {
    path: ROUTES.HISTORY,
    element: <HistoryView />,
    errorElement: <ErrorPage />
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfileView />,
    errorElement: <ErrorPage />
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <ErrorPage notFound={true} />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
