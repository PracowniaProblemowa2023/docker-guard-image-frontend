import React from 'react';
import ViewTemplate from '../../templates/ViewTemplate';
import arrow from '../../assets/svg/arrow-right.svg';

export default function ResultsView() {
  return (
    <ViewTemplate isLogged={true}>
      <div className="w-full h-full flex flex-col">
        <div className="flex h-full flex-col gap-4">
          <h1 className="text-4xl">
            <span className="text-red-normal">Vulnerability</span> scanning report of Ubuntu 21.10
            image
          </h1>
          <p>List of found vulnerabilities with their security scores</p>
          <div className="mt-11 h-1/3 grid grid-cols-12 gap-4">
            <div className="col-span-7 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
              Package Name
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
              Version
            </div>
            <div className="col-span-3 flex items-center justify-center font-bold text-xl bg-black text-white rounded-sm">
              Ecosystem
            </div>
            <div className="col-span-7 flex items-center justify-center bg-white rounded-sm">
              com.fasterxml.jackson.core:jackson-databind
            </div>
            <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
              2.9.10.4
            </div>
            <div className="col-span-3 flex items-center justify-center bg-white rounded-sm">
              Maven
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <img className="w-10 h-10" src={arrow}></img>
            </div>
            <div className="col-span-6 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
              Summary
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
              CVE
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold text-xl bg-gray-700 text-white rounded-sm">
              Severity
            </div>
            <div className="col-span-2 "></div>
            <div className="col-span-6 flex items-center justify-center bg-white rounded-sm">
              XML External Entity (XXE) Injection in Jackson Databind
            </div>
            <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
              CVE-2020-25649
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold bg-red-400 rounded-sm">
              HIGH
            </div>
            <div className="col-span-2 "></div>
            <div className="col-span-6 flex items-center justify-center bg-white rounded-sm">
              Deeply nested json in jackson-databind
            </div>
            <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
              CVE-2020-36518
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold bg-orange-300 rounded-sm">
              MEDIUM
            </div>
            <div className="col-span-2 "></div>
            <div className="col-span-6 flex items-center justify-center bg-white rounded-sm">
              Deserialization of untrusted data in jackson-databind
            </div>
            <div className="col-span-2 flex items-center justify-center bg-white rounded-sm">
              CVE-2021-20190
            </div>
            <div className="col-span-2 flex items-center justify-center font-bold bg-green-300 rounded-sm">
              LOW
            </div>
          </div>
        </div>
      </div>
    </ViewTemplate>
  );
}
