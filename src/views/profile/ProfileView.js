import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, ERROR } from '../../miscellanous/Constants';
import Spinner from '../../miscellanous/Components';
import { ThrowError } from '../../errors/ErrorThrower';

export default function ProfileView() {
  const { keycloak } = useKeycloak();
  const [profile, setProfile] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  async function getProfile() {
    await axios({
      method: 'get',
      url: ENDPOINTS.PROFILE,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setProfile(data);
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
    getProfile();
  }, []);

  if (errorCode) {
    ThrowError(errorCode);
  }

  return profile !== null ? (
    <div className="w-full h-74 flex flex-col justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">Your hub for user-specific information and account management</h1>
        <p>You can find here information about your profile.</p>
        <div className="w-full flex flex-row gap-10">
          <div className="flex flex-col font-semibold">
            <p className="mt-1">Name: </p>
            <p className="mt-1">Email:</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-1">{profile.name + ' ' + profile.lastname}</p>
            <p className="mt-1">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
