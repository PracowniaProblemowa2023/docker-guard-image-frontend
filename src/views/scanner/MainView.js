import React from 'react';
import ViewTemplate from '../../templates/ViewTemplate';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../miscellanous/Constants';

export default function ScannerView() {
  const navigate = useNavigate();

  function navigateToResults() {
    return navigate(ROUTES.RESULTS);
  }

  return (
    <ViewTemplate isLogged={true}>
      <div className="w-full h-1/2 flex flex-col justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">
            Uncover potential security <span className="text-red-normal">risks</span> effortlessly
            as you scan your Docker Images for{' '}
            <span className="text-red-normal">vulnerabilities </span>
            with{' '}
            <span className="font-bold">
              DOCKER IMAGE <span className="text-red-normal">GUARD</span>
            </span>
          </h1>
          <p>
            Enter image name with tag from the Docker Hub or upload your Docker image directly and
            we&apos;ll scan it for you.
          </p>
          <div className="w-full mt-11 flex flex-row gap-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageWithTag"
              type="text"
              placeholder="image_name:tag"
            />
            <button className="bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light">
              Upload
            </button>
            <button
              className="bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light"
              onClick={navigateToResults}>
              Scan
            </button>
          </div>
        </div>
      </div>
    </ViewTemplate>
  );
}
