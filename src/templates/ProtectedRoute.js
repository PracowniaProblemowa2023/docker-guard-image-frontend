import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { useOutlet } from 'react-router-dom';
import { ROUTES } from '../miscellanous/Constants';

export default function ProtectedRoute() {
  const outlet = useOutlet();
  const { keycloak } = useKeycloak();

  if (!keycloak?.authenticated) {
    return <Navigate to={ROUTES.WELCOME} />;
  }

  return outlet;
}
