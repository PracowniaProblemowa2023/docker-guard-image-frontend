import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation/NavigationBar';
import ErrorBoundary from './ErrorBoundary';

export default function ViewTemplate({ children, isLogged }) {
  return (
    <ErrorBoundary>
      <NavigationBar isLogged={isLogged} />
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
        <div className="flex-grow mt-40">{children}</div>
        <div className="flex items-center justify-center mt-auto mb-0 p-2 text-xs">
          Copyright © 2023 &nbsp;<span className="text-red-normal"> DOCKER IMAGE GUARD</span>. All
          Rights Reserved. Made In Poland.
        </div>
      </div>
    </ErrorBoundary>
  );
}

ViewTemplate.propTypes = {
  children: PropTypes.any,
  isLogged: PropTypes.bool
};
