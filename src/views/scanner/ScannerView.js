import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS, ROUTES } from '../../miscellanous/Constants';
import { ThrowError } from '../../errors/ErrorThrower';

export default function ScannerView() {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const [imageInputValue, setImageInputValue] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  function handleImageInputChange(e) {
    const { value } = e.target;
    setImageInputValue(value);
  }

  function scanImage() {
    axios({
      method: 'post',
      url: ENDPOINTS.SCAN,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      },
      data: {
        image: imageInputValue
      }
    })
      .then(({ data }) => {
        navigateToResults(data.id);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  if (errorCode) {
    ThrowError(errorCode);
  }

  function navigateToResults(imageId) {
    return navigate(ROUTES.RESULTS + '/' + imageId);
  }

  return (
    <div className="w-full h-1/2 flex flex-col justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">
          Uncover potential security <span className="text-red-normal">risks</span> effortlessly as
          you scan your Docker Images for <span className="text-red-normal">vulnerabilities </span>
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
            onChange={handleImageInputChange}
          />
          <button
            className="bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light"
            onClick={scanImage}>
            Scan
          </button>
        </div>
      </div>
    </div>
  );
}
