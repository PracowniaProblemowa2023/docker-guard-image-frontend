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

// FYI https://reactrouter.com/en/main/start/tutorial

const router = createBrowserRouter([
  {
    path: ROUTES.WELCOME,
    element: <WelcomeView />
  },
  {
    path: ROUTES.SCANNER,
    element: <ScannerView />
  },
  {
    path: ROUTES.RESULTS,
    element: <ResultsView />
  },
  {
    path: ROUTES.HISTORY,
    element: <HistoryView />
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfileView />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>{<RouterProvider router={router} />}</React.StrictMode>);
