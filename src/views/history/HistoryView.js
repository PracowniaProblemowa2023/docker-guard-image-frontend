import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, ERROR } from '../../miscellanous/Constants';
import HistoryRow from '../../miscellanous/components/HistoryRow';
import { ThrowError } from '../../errors/ErrorThrower';
import Spinner from '../../miscellanous/Components';

export default function HistoryViews() {
  const { keycloak } = useKeycloak();
  const [history, setHistory] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  async function getHistory() {
    await axios({
      method: 'get',
      url: ENDPOINTS.HISTORY,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setHistory(data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorCode(error.response.status);
        } else {
          setErrorCode(ERROR.UNKNOWN);
        }
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  if (errorCode) {
    ThrowError(errorCode);
  }

  return history !== null ? (
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
        <div className="h-11 mt-11 grid grid-cols-12 gap-4">
          <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            DATE
          </div>
          <div className="col-span-6 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            IMAGE
          </div>
          <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            STATUS
          </div>
          <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
            RESULT
          </div>
        </div>
        {history.map((element, index) => (
          <HistoryRow element={element} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
