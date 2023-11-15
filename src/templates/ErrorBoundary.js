import React from 'react';
import PropTypes from 'prop-types';

// TODO
export default function ErrorBoundary({ children }) {
  return <>{children}</>;
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};
