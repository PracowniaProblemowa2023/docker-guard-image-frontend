import React, { useEffect, useState } from 'react';
import ResultDetailRow from './ResultDetailRow';
import PropTypes from 'prop-types';
import Spinner from '../Components';

export default function ResultRow({ element, isWithVulnerabilities, index }) {
  const [vulnerabilitiesCve, setVulnerabilitiesCve] = useState(null);

  async function getVulnerabilities() {
    setVulnerabilitiesCve(element.packageThreatsCve);
  }

  useEffect(() => {
    getVulnerabilities();
  }, []);

  return vulnerabilitiesCve !== null ? (
    <div>
      <div
        className={
          isWithVulnerabilities || index === 0 ? 'mt-2 h-1/9 grid grid-cols-12 gap-4' : 'hidden'
        }>
        <div className="col-span-8 flex items-center justify-center font-bold text-l bg-black text-white rounded-sm">
          Package Name
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-l bg-black text-white rounded-sm">
          Version
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-l bg-black text-white rounded-sm">
          Ecosystem
        </div>
      </div>
      <div
        className={
          isWithVulnerabilities || index === 0
            ? 'mt-1 h-1/9 grid grid-cols-12 gap-4'
            : 'mt-1 h-1/9 grid grid-cols-12 gap-4'
        }>
        <div className="col-span-8 flex items-center justify-center bg-white rounded-sm">
          {element.name}
        </div>
        <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
          {element.version}
        </div>
        <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
          {element.type}
        </div>
      </div>
      <div className={isWithVulnerabilities ? 'mt-1 h-1/9 grid grid-cols-12 gap-4' : 'hidden'}>
        <div className="col-span-8 flex items-center justify-center font-bold text-l bg-gray-500 text-white rounded-sm">
          Summary
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-l bg-gray-500 text-white rounded-sm">
          CVE
        </div>
        <div className="col-span-2 flex items-center justify-center font-bold text-l bg-gray-500 text-white rounded-sm">
          Severity
        </div>
      </div>
      {vulnerabilitiesCve.map((element) => (
        <ResultDetailRow element={element} key={element.osvId} />
      ))}
    </div>
  ) : (
    <Spinner />
  );
}

ResultRow.propTypes = {
  element: PropTypes.any,
  isWithVulnerabilities: PropTypes.bool,
  index: PropTypes.object.isOptional
};
