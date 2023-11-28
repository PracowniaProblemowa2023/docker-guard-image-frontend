import React from 'react';
import ViewTemplate from '../../templates/ViewTemplate';

export default function ProfileView() {
  return (
    <ViewTemplate isLogged={true}>
      <div className="w-full h-74 flex flex-col justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">
            Your hub for user-specific information and account management
          </h1>
          <p>You can find here information about your profile.</p>
          <div className="w-full flex flex-row gap-10">
            <div className="flex flex-col font-semibold">
              <p className="mt-1">Name:</p>
              <p className="mt-1">Email:</p>
            </div>
            <div className="flex flex-col">
              <p className="mt-1">Marek</p>
              <p className="mt-1">marek@gmail.com</p>
            </div>
          </div>
          <br></br>
          <p>
            You can also delete your account, but remember, that all your scan history will be
            irreversibly lost.
          </p>
          <button className="bg-gray-400 text-white rounded-sm w-44 h-12 hover:bg-red-light transition duration-300">
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </ViewTemplate>
  );
}
