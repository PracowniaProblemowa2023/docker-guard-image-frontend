import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Components';

export default function ResultDetailRow({ element }) {
  ResultDetailRow.propTypes = {
    element: PropTypes.object.isRequired
  };
  return element !== null ? (
    <div className="mt-1 h-1/9 grid grid-cols-12 gap-4">
      <div className="col-span-7 flex items-center justify-center bg-white rounded-sm">
        {element.summary}
      </div>
      <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
        {element.osvId}
      </div>
      <div
        className={
          element.severity === 'SEVERE'
            ? 'col-span-3 flex items-center justify-center font-bold rounded-sm bg-red-600'
            : '' + element.severity === 'HIGH'
            ? 'col-span-3 flex items-center justify-center font-bold rounded-sm bg-red-400'
            : '' + element.severity === 'MEDIUM'
            ? 'col-span-3 flex items-center justify-center font-bold rounded-sm bg-orange-300'
            : '' + element.severity === 'LOW'
            ? 'col-span-3 flex items-center justify-center font-bold rounded-sm bg-green-300'
            : ''
        }>
        {element.severity}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
