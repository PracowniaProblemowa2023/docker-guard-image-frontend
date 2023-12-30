import React from 'react';
import PropTypes from 'prop-types';

export default function Notification({ date, message, bg, elementId, goToElement }) {
  return (
    <div
      className={`w-full cursor-pointer hover:bg-red-300 border-2 p-4 text-gray-900 ${bg} rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 mb-3`}
      onClick={() => goToElement(elementId)}>
      <div className="flex w-full items-center justify-center">
        <div className="ms-3 text-sm font-normal">
          <div className="text-base font-bold">{message}</div>
          <span className="text-sm font-bold text-red-normal">{date}</span>
        </div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  date: PropTypes.string,
  message: PropTypes.string,
  bg: PropTypes.string,
  elementId: PropTypes.number,
  goToElement: PropTypes.func
};
