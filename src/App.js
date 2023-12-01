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
import Spinner from './miscellanous/Components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppTemplate />} errorElement={<ErrorPage />}>
        <Route path={ROUTES.WELCOME} element={<WelcomeView />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.SCANNER} element={<ScannerView />} />
          <Route path={ROUTES.RESULTS} element={<ResultsView />} />
          <Route path={ROUTES.HISTORY} element={<HistoryView />} />
          <Route path={ROUTES.PROFILE} element={<ProfileView />} />
        </Route>
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<ErrorPage notFound={true} />} />
    </>
  )
);

export default function App() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <Spinner />;
  }

  return <RouterProvider router={router} />;
}
