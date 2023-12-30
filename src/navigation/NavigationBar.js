import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ENDPOINTS, ROUTES } from '../miscellanous/Constants';
import axios from 'axios';
import logo from '../assets/svg/app-logo.svg';
import notification from '../assets/svg/notification.svg';
import notificationBadged from '../assets/svg/notification_badged.svg';
import { useKeycloak } from '@react-keycloak/web';
import NotificationList from './NotificationList';

export default function NavigationBar() {
  const [activeView, setActiveView] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [oldNotifications, setOldNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { keycloak } = useKeycloak();
  const location = useLocation();
  let isLogged = location.pathname != ROUTES.WELCOME;

  let notSelectedColor = 'text-white';
  let selectedColor = 'text-red-normal';

  useEffect(() => {
    let currentView = '';

    switch (location.pathname) {
      case ROUTES.SCANNER:
        currentView = ROUTES.SCANNER;
        break;

      case ROUTES.HISTORY:
        currentView = ROUTES.HISTORY;
        break;

      case ROUTES.PROFILE:
        currentView = ROUTES.PROFILE;
        break;

      default:
        break;
    }

    setActiveView(currentView);

    fetchNotifications();
  }, [location.pathname]);

  async function fetchNotifications() {
    await axios({
      method: 'get',
      url: ENDPOINTS.NOTIFICATIONS,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setNotifications(data.content);
        groupNotifications(data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function groupNotifications(allNotifications) {
    const storedNotificationsViewTime = localStorage.getItem('notificationsViewTime');

    let parsedNotificationsViewTime;

    if (storedNotificationsViewTime != null) {
      parsedNotificationsViewTime = new Date(JSON.parse(storedNotificationsViewTime));
    } else {
      parsedNotificationsViewTime = new Date(0);
    }

    setNewNotifications(
      allNotifications.filter((notif) => {
        const notifTime = new Date(notif.date);
        return notifTime > parsedNotificationsViewTime;
      })
    );

    setOldNotifications(
      allNotifications.filter((notif) => {
        const notifTime = new Date(notif.date);
        return notifTime < parsedNotificationsViewTime;
      })
    );
  }

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  return (
    <>
      <header className="bg-black">
        <div className="mx-auto h-22 flex items-center max-w-7xl p6">
          <img
            className="w-44 h-44 absolute top-0 left-25"
            src={logo}
            alt="docker-image-guard-logo"
          />
          <nav className="mr-0 ml-auto flex flex-row-reverse items-center gap-28">
            {!isLogged ? (
              <button
                className={`bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light`}
                onClick={login}>
                LOGIN
              </button>
            ) : (
              <>
                <button
                  className="bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light"
                  onClick={() => keycloak?.logout()}>
                  LOGOUT
                </button>
                <img
                  className="w-10 h-10"
                  src={newNotifications.length > 0 ? notificationBadged : notification}
                  onClick={() => setShowNotifications(!showNotifications)}></img>
                <Link to={ROUTES.PROFILE}>
                  <div
                    className={`${
                      activeView === ROUTES.PROFILE ? selectedColor : notSelectedColor
                    } text-m hover:text-red-normal`}>
                    Profile
                  </div>
                </Link>
                <Link to={ROUTES.HISTORY}>
                  <div
                    className={`${
                      activeView === ROUTES.HISTORY ? selectedColor : notSelectedColor
                    } text-m hover:text-red-normal`}>
                    History
                  </div>
                </Link>
                <Link to={ROUTES.SCANNER}>
                  <div
                    className={`${
                      activeView === ROUTES.SCANNER ? selectedColor : notSelectedColor
                    } text-m hover:text-red-normal`}>
                    Scanner
                  </div>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      {isLogged & showNotifications ? (
        <NotificationList
          setShowNotifications={setShowNotifications}
          groupNotifications={groupNotifications}
          allNotifications={notifications}
          newNotifications={newNotifications}
          oldNotifications={oldNotifications}></NotificationList>
      ) : null}
    </>
  );
}

NavigationBar.propTypes = {
  isLogged: PropTypes.bool
};
