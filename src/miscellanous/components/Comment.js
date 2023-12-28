import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ element }) {
  Comment.propTypes = {
    element: PropTypes.object.isRequired
  };

  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className="col-span-12 flex justify-center px-2 py-2 bg-white rounded-sm min-h-12 flex-col">
        <p className="text-sm text-wrap">
          <span className="text-red-normal font-bold">{element.createdBy}</span> {element.date}
        </p>
        <p>{element.text}</p>
      </div>
    </div>
  );
}
