import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import WelcomeView from './views/welcome/WelcomeView';
import ScannerView from './views/scanner/ScannerView';
import ResultsView from './views/results/ResultsView';
import HistoryView from './views/history/HistoryView';
import ProfileView from './views/profile/ProfileView';
import ProtectedRoute from './templates/ProtectedRoute';
import { ROUTES } from './miscellanous/Constants';
import ErrorPage from './errors/ErrorPage';
import { useKeycloak } from '@react-keycloak/web';
import AppTemplate from './templates/AppTemplate';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppTemplate />} errorElement={<ErrorPage />}>
      <Route path={ROUTES.WELCOME} element={<WelcomeView />} errorElement={<ErrorPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.SCANNER} element={<ScannerView />} errorElement={<ErrorPage />} />
        <Route path={ROUTES.RESULTS} element={<ResultsView />} errorElement={<ErrorPage />} />
        <Route path={ROUTES.HISTORY} element={<HistoryView />} errorElement={<ErrorPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfileView />} errorElement={<ErrorPage />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<ErrorPage notFound={true} />} />
    </Route>
  )
);

export default function App() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <h1>Loading...</h1>;
  }

  return <RouterProvider router={router} />;
}
