import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ENDPOINTS } from '../../miscellanous/Constants';
import Spinner from '../../miscellanous/Components';
import ResultRow from '../../miscellanous/components/ResultRow';
import { ThrowError } from '../../errors/ErrorThrower';

export default function ResultsView() {
  const params = useParams();
  const { keycloak } = useKeycloak();
  const [scanResult, setScanResult] = useState(null);
  const [packages, setPackages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  async function getScanResult() {
    await axios({
      method: 'get',
      url: ENDPOINTS.SCAN_RESULT + '?id=' + params.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        let tmpPayloads = [];
        data.payloads.forEach((element) => {
          if (element.packageThreatsOsv.length !== 0 || element.packageThreatsCve.length !== 0) {
            // if (element.packageThreatsCve.length !== 0) {
            tmpPayloads.push(element);
          }
        });
        data.payloads = tmpPayloads;
        console.log(data); //TODO: do usunięcia
        setScanResult(data);
        setPackages(data.payloads);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  useEffect(() => {
    getScanResult();
  }, []);

  if (errorCode) {
    ThrowError(errorCode);
  }

  return scanResult !== null ? (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full flex-col gap-4">
        <h1 className="text-4xl">
          <span className="text-red-normal">Vulnerability</span> scanning report of
          <span className="text-red-normal">{' ' + scanResult.imageName + ' '}</span>
          image
        </h1>
        <p>List of found vulnerabilities with their security scores</p>
        {packages.map((element) => (
          <ResultRow element={element} key={element.version} />
        ))}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
