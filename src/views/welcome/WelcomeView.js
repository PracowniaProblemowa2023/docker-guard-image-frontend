import { React, useCallback } from 'react';
import shield from '../../assets/svg/shield.svg';
import report from '../../assets/svg/report.svg';
import file from '../../assets/svg/file.svg';
import happy from '../../assets/svg/happy.svg';
import { ROUTES } from '../../miscellanous/Constants';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export default function WelcomeView() {
  const { keycloak } = useKeycloak();

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    return <Navigate to={ROUTES.SCANNER} />;
  }

  return (
    <div className="w-2/3">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl">
          Unleash the power of secure containerization with DOCKER IMAGE&nbsp;
          <span className="text-red-normal">GUARD</span>
        </h1>
        <p>
          Our user-friendly application designed to scan Docker images for potential
          vulnerabilities. Safeguard your deployments by effortlessly analyzing dependencies within
          your Docker images, ensuring the resilience of your infrastructure.
        </p>
        <div>
          <button
            className={`bg-red-normal text-white rounded-sm w-48 h-10 text-xs hover:bg-red-light`}
            onClick={login}>
            START NOW
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-8 text-2xl">
        <div className="flex items-start mb-4">
          <img className="w-6 h-6 mr-4" src={shield}></img>
          <p>Comprehensive Security Checks</p>
        </div>
        <div className="flex items-start mb-4">
          <img className="w-6 h-6 mr-4" src={report}></img>
          <p>Detailed Reports</p>
        </div>
        <div className="flex items-start mb-4">
          <img className="w-6 h-6 mr-4" src={file}></img>
          <p>Save Reports for Later Review</p>
        </div>
        <div className="flex items-start mb-4">
          <img className="w-6 h-6 mr-4" src={happy}></img>
          <p>User-Friendly Interface</p>
        </div>
      </div>
    </div>
  );
}
