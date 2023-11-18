import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation/NavigationBar';

export default function ViewTemplate({ children, isLogged }) {
  return (
    <>
      <NavigationBar isLogged={isLogged} />
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="flex-grow mt-40">{children}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-2 text-xs">
        Copyright © 2023 &nbsp;<span className="text-red-normal"> DOCKER IMAGE GUARD</span>. All
        Rights Reserved. Made In Poland.
      </div>
    </>
  );
}

ViewTemplate.propTypes = {
  children: PropTypes.any,
  isLogged: PropTypes.bool
};
