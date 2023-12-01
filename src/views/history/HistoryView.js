import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../miscellanous/Constants';

export default function HistoryViews() {
  const navigate = useNavigate();

  function navigateToResults() {
    return navigate(ROUTES.RESULTS);
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">
          Explore a detailed chronicle of past{' '}
          <span className="text-red-normal">vulnerability</span> scans, empowering you with insights
          into your Docker image security evolution.
        </h1>
        <p>
          You can find your previous scans here. After clicking on the link, you can view the
          details of a given scan.
        </p>
        <div className="h-48 mt-11 grid grid-cols-12 grid-rows-3 gap-4">
          <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            DATE
          </div>
          <div className="col-span-8 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            IMAGE
          </div>
          <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            RESULT
          </div>
          <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
            10.11.2023 16:17
          </div>
          <div className="col-span-8 flex items-center justify-center bg-white rounded-sm">
            Ubuntu 21.20
          </div>
          <button
            className="col-span-2 bg-red-normal text-white rounded-sm hover:bg-red-light"
            onClick={navigateToResults}>
            View
          </button>
          <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
            11.09.2023 20:09
          </div>
          <div className="col-span-8 flex items-center justify-center bg-white rounded-sm">
            Ubuntu 23.10
          </div>
          <button
            className="col-span-2 bg-red-normal text-white rounded-sm hover:bg-red-light"
            onClick={navigateToResults}>
            View
          </button>
        </div>
      </div>
    </div>
  );
}
