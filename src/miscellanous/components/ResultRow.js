import React, { useEffect, useState } from 'react';
import ResultDetailRow from './ResultDetailRow';
import PropTypes from 'prop-types';
import Spinner from '../Components';

export default function ResultRow({ element }) {
  const [vulnerabilities, setVulnerabilities] = useState(null);

  ResultRow.propTypes = {
    element: PropTypes.object.isRequired
  };

  async function getVulnerabilities() {
    setVulnerabilities(element.packageThreatsCve);
  }

  useEffect(() => {
    getVulnerabilities();
  }, []);

  return vulnerabilities !== null ? (
    <div>
      <div className="mt-2 h-1/9 grid grid-cols-12 gap-4">
        <div className="col-span-7 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
          Package Name
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
          Version
        </div>
        <div className="col-span-3 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
          Ecosystem
        </div>
      </div>
      <div className="mt-1 h-1/9 grid grid-cols-12 gap-4">
        <div className="col-span-7 flex items-center justify-center bg-white rounded-sm">
          {element.name}
        </div>
        <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
          {element.version}
        </div>
        <div className="col-span-3 flex items-center justify-center bg-white rounded-sm">
          {element.type}
        </div>
      </div>
      <div className="mt-1 h-1/9 grid grid-cols-12 gap-4">
        {/* Podatnosci header */}
        <div className="col-span-7 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
          Summary
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
          CVE
        </div>
        <div className="col-span-3 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
          Severity
        </div>
      </div>
      {/* Zarartosc */}
      {vulnerabilities.map((element) => (
        <ResultDetailRow element={element} key={element.osvId} />
      ))}
    </div>
  ) : (
    <Spinner />
  );
}
