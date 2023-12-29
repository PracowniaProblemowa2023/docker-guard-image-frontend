import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ENDPOINTS } from '../../miscellanous/Constants';
import Spinner from '../../miscellanous/Components';
import ResultRow from '../../miscellanous/components/ResultRow';
import { ThrowError } from '../../errors/ErrorThrower';
import ResultsComment from './ResultsComment';
import Share from './Share';

export default function ResultsView() {
  const params = useParams();
  const { keycloak } = useKeycloak();
  const [scanState, setScanState] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [packages, setPackages] = useState(null);
  const [share, setShare] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [writeAccess, setWriteAccess] = useState(false);

  async function getScanState() {
    await axios({
      method: 'get',
      url: ENDPOINTS.SCAN_STATE + '?id=' + params.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setScanState(data);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

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
        setWriteAccess(data.permission === 'WRITE');
        let tmpPayloads = [];
        data.payloads.forEach((element) => {
          // if (element.packageThreatsOsv.length !== 0 || element.packageThreatsCve.length !== 0) {
          if (element.packageThreatsCve.length !== 0) {
            tmpPayloads.push(element);
          }
        });
        data.payloads = tmpPayloads;
        setScanResult(data);
        setPackages(data.payloads);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  useEffect(() => {
    getScanState();
    getScanResult();
  }, []);

  if (errorCode) {
    ThrowError(errorCode);
  }

  return scanResult !== null ? (
    <div className="w-full h-full flex flex-col">
      {share ? <Share setShare={setShare}></Share> : null}
      <div className="flex h-full flex-col gap-4">
        <h1 className="text-4xl">
          <span className="text-red-normal">Vulnerability</span> scanning report of
          <span className="text-red-normal">{' ' + scanResult.imageName + ' '}</span>
          image
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-10">List of found vulnerabilities with their security scores</p>
          {writeAccess && (
            <button
              className="col-span-2 w-full bg-red-normal text-white rounded-sm h-12 hover:bg-red-light float-right"
              onClick={() => setShare(true)}>
              Share
            </button>
          )}
        </div>
        <h2
          className={
            scanState.state === 'FINISHED' && packages.length === 0 ? 'text-xl' : 'hidden'
          }>
          No vulnerabilities found
        </h2>
        <h2
          className={
            scanState.state === 'PROGRESS' || scanState.state === 'STARTED' ? 'text-xl' : 'hidden'
          }>
          Scanning in progress, try again later.
        </h2>
        {scanState.state !== 'PROGRESS' && scanState.state !== 'STARTED'
          ? packages.map((element) => <ResultRow element={element} key={element.version} />)
          : ''}
        <ResultsComment scanResultId={params.id}></ResultsComment>
        <div className="w-full mb-10 invisible"></div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
