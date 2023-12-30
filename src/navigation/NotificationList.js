import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../miscellanous/Constants';

export default function NotificationList({
  setShowNotifications,
  groupNotifications,
  allNotifications,
  newNotifications,
  oldNotifications
}) {
  const navigate = useNavigate();

  function navigateToResults(elementId) {
    setShowNotifications(false);
    return navigate(ROUTES.RESULTS + '/' + elementId);
  }

  function updateNotificationsLastViewTime() {
    localStorage.setItem('notificationsViewTime', JSON.stringify(new Date()));
    groupNotifications(allNotifications);
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-whitetext-left shadow-xl transition-all w-1/3">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
              <div className="sm:flex flex-col sm:items-start">
                <div className="flex flex-row justify-between">
                  <div className="pt-3 w-full text-center sm:mt-0 sm:text-left">
                    <h1
                      className="text-2xl font-semibold leading-6 text-gray-900 "
                      id="modal-title">
                      Notifications
                    </h1>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="oc se w-6 h-6 absolute right-5 cursor-pointer"
                    onClick={() => {
                      setShowNotifications(false);
                      updateNotificationsLastViewTime();
                    }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <div className="flex mt-5 items-center w-full justify-center">
                  <h3
                    className="text-base font-bold leading-6 text-red-normal text-center"
                    id="modal-title">
                    New
                  </h3>
                </div>
                <div className="flex flex-col items-center w-full justify-center">
                  {newNotifications.map((notification) => (
                    <Notification
                      key={notification.id}
                      date={notification.date}
                      type={notification.type}
                      message={notification.message}
                      bg={'bg-white'}
                      elementId={notification.elementId}
                      goToElement={navigateToResults}
                    />
                  ))}
                </div>
                <div className="flex mt-5 items-center w-full justify-center">
                  <h3
                    className="text-base font-bold leading-6 text-red-normal text-center"
                    id="modal-title">
                    Old
                  </h3>
                </div>
                <div className="flex flex-col items-center w-full justify-center">
                  {oldNotifications.map((notification) => (
                    <Notification
                      key={notification.id}
                      date={notification.date}
                      message={notification.message}
                      bg={'bg-gray-300'}
                      elementId={notification.elementId}
                      goToElement={navigateToResults}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    updateNotificationsLastViewTime();
                  }}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NotificationList.propTypes = {
  setShowNotifications: PropTypes.any,
  groupNotifications: PropTypes.any,
  allNotifications: PropTypes.array,
  newNotifications: PropTypes.array,
  oldNotifications: PropTypes.array
};
