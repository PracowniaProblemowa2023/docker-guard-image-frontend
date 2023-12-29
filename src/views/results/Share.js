import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ENDPOINTS } from '../../miscellanous/Constants';
import { ThrowError } from '../../errors/ErrorThrower';

export default function Share({ setShare }) {
  const params = useParams();
  const { keycloak } = useKeycloak();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  async function getSelected() {
    await axios({
      method: 'get',
      url: ENDPOINTS.SHARE_SCAN_RESULT + '/' + params.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setSelected(data);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  async function getSearch(payload) {
    await axios({
      method: 'get',
      url: ENDPOINTS.USERS + '?payload=' + payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setSearch(data);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  function addUser(id) {
    const dataToSend = {
      userId: id,
      permission: 'READ',
      imageScanId: params.id
    };

    axios({
      method: 'post',
      url: ENDPOINTS.ADD_ACCESS,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      },
      data: dataToSend
    })
      .then(() => {
        getSelected();
        getSearch(searchValue);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  function removeUser(id) {
    const dataToSend = {
      userId: id,
      imageScanId: params.id
    };

    axios({
      method: 'delete',
      url: ENDPOINTS.ADD_ACCESS,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      },
      data: dataToSend
    })
      .then(() => {
        getSelected();
        getSearch(searchValue);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }

  function searchEngine() {
    getSearch(searchValue);
  }

  useEffect(() => {
    getSelected();
    getSearch('');
  }, []);

  if (errorCode) {
    ThrowError(errorCode);
  }

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <svg
                    onClick={() => setShare(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="oc se w-6 h-6 absolute right-5 cursor-pointer">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="w-12 h-12 text-red-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                  <div className="pt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-11/12">
                    <h1
                      className="text-2xl font-semibold leading-6 text-gray-900 "
                      id="modal-title">
                      Share image
                    </h1>
                    <div className="pt-2 relative mx-auto text-gray-600">
                      <input
                        className="border-2 border-gray-300 bg-white h-10 px-5 w-10/12 pr-8 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search by firstname, lastname, username or email"></input>
                      <button
                        type="submit"
                        className="relative right-7 top-1.5 mt-5 mr-4"
                        onClick={() => searchEngine()}>
                        <svg
                          className="text-red-600 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 56.966 56.966"
                          width="512px"
                          height="512px">
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                    {selected && <p className="my-5 text-2xl mb-0 font-bold">Selected</p>}
                    {selected && (
                      <div className="max-h-72 overflow-y-auto">
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.map((element) => (
                              <tr key={'select-' + element.id}>
                                <td className="py-1">
                                  <svg
                                    className="w-6 h-6 text-red-600 dark:text-white float-left"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                  </svg>
                                  <p className="float-left ml-5 text-lg">{element.fullName}</p>
                                  <svg
                                    onClick={() => removeUser(element.id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="oc se w-6 h-6 cursor-pointer py-0 my-0 text-red-600 hover:text-red-900">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {search && <p className="my-5 text-2xl mb-0 font-bold">Found</p>}
                    {search && (
                      <div className="max-h-72 overflow-y-auto">
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {search.map((element) =>
                              selected && selected.map((e) => e.id).includes(element.id) ? null : (
                                <tr key={'search-' + element.id}>
                                  <td className="py-1">
                                    <svg
                                      className="w-6 h-6 text-red-600 dark:text-white float-left"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 20 20">
                                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                    <p className="float-left ml-5 text-lg">
                                      {element.fullName}{' '}
                                      <span className="text-gray-600">{element.email}</span>
                                    </p>
                                    <p
                                      onClick={() => addUser(element.id)}
                                      className="float-left ml-2 text-lg cursor-pointer text-red-600 hover:text-red-900">
                                      share
                                    </p>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => setShare(false)}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Share.propTypes = { setShare: PropTypes.any };
