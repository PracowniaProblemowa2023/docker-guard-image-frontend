import React from 'react';
import { useOutlet } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';

export default function AppTemplate() {
  const outlet = useOutlet();
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="view-container flex-grow mt-40">{outlet}</div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-2 text-xs">
        Copyright © 2023 &nbsp;<span className="text-red-normal"> DOCKER IMAGE GUARD</span>. All
        Rights Reserved. Made In Poland.
      </div>
    </>
  );
}
