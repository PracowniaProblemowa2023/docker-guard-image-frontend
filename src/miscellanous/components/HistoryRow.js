import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../miscellanous/Constants';

export default function HistoryRow({ element }) {
  const navigate = useNavigate();

  HistoryRow.propTypes = {
    element: PropTypes.object.isRequired
  };

  function navigateToResults() {
    return navigate(ROUTES.RESULTS + '/' + element.id);
  }

  return (
    <div className="h-11 grid grid-cols-12 gap-4">
      <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
        {element.date}
      </div>
      <div className="col-span-6 flex items-center justify-center bg-white rounded-sm">
        {element.imageName}
      </div>
      <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
        {element.result}
      </div>
      <button
        className="col-span-2 bg-red-normal text-white rounded-sm hover:bg-red-light"
        onClick={navigateToResults}>
        View
      </button>
    </div>
  );
}
