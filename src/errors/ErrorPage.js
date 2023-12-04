import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { ERROR, ROUTES } from '../miscellanous/Constants';
import { useKeycloak } from '@react-keycloak/web';

const FIELDS = {
  404: {
    header: 'Page not found',
    paragraph: 'Sorry, we couldn’t find the page you’re looking for.'
  },
  401: {
    header: 'You are not authorized',
    paragraph: 'Sorry, but you need to log in first.'
  },
  403: {
    header: 'Request forbidden',
    paragraph: 'This resource is not meant for your eyes.'
  },
  500: {
    header: 'Internal Server Error',
    paragraph: 'Something wrong on our side. Sorry...'
  },
  UNKNOWN: {
    header: '"Hard to explain" error',
    paragraph: 'Sorry...'
  }
};

export default function ErrorPage({ notFound = false }) {
  const error = useRouteError();

  if (notFound) {
    return getPage(ERROR.NOT_FOUND, FIELDS[ERROR.NOT_FOUND]);
  }

  if (error) {
    switch (error.status) {
      case ERROR.NOT_FOUND:
        return getPage(ERROR.NOT_FOUND, FIELDS[ERROR.NOT_FOUND]);
      case ERROR.UNAUTHORIZED:
        return getPage(ERROR.UNAUTHORIZED, FIELDS[ERROR.UNAUTHORIZED]);
      case ERROR.FORBIDDEN:
        return getPage(ERROR.FORBIDDEN, FIELDS[ERROR.FORBIDDEN]);
      case ERROR.INTERNAL_SERVER_ERROR:
        return getPage(ERROR.INTERNAL_SERVER_ERROR, FIELDS[ERROR.INTERNAL_SERVER_ERROR]);
      default:
        return getPage(null, FIELDS[ERROR.UNKNOWN]);
    }
  }
}

function getPage(status = null, fields) {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {status != null && <p className="text-base font-semibold text-red-normal">{status}</p>}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {fields.header}
        </h1>
        <p className="mt-6 text-base leading-7 text-red-normal">{fields.paragraph}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-red-normal px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-light"
            onClick={() => navigate(-1)}>
            Go back
          </button>
          <button
            className="rounded-md bg-red-normal px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-light"
            onClick={() => {
              if (keycloak.authenticated) {
                navigate(ROUTES.SCANNER);
              } else {
                navigate(ROUTES.WELCOME);
              }
            }}>
            {keycloak.authenticated ? 'Go to main page' : 'Go to home page'}
          </button>
        </div>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  notFound: PropTypes.bool
};
