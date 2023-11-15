import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../miscellanous/Constants';
import logo from '../assets/svg/app-logo.svg';

export default function NavigationBar({ isLogged }) {
  const [activeView, setActiveView] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location.pathname]);

  function onLogout() {
    return navigate(ROUTES.WELCOME);
  }

  return (
    <header className="bg-black">
      <div className="mx-auto h-22 flex items-center max-w-7xl p6">
        <img
          className="w-44 h-44 absolute top-0 left-25"
          src={logo}
          alt="docker-image-guard-logo"
        />
        <nav className="mr-0 ml-auto flex flex-row-reverse items-center gap-28">
          {!isLogged ? (
            <>
              <Link to={ROUTES.SCANNER}>
                <button
                  className={`bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light`}>
                  GET STARTED
                </button>
              </Link>
              <Link to={ROUTES.SCANNER}>
                <button className="text-white text-m hover:text-red-normal">Login</button>
              </Link>
            </>
          ) : (
            <>
              <button
                className="bg-red-normal text-white rounded-sm w-44 h-12 hover:bg-red-light"
                onClick={onLogout}>
                LOGOUT
              </button>
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
  );
}

NavigationBar.propTypes = {
  isLogged: PropTypes.bool
};
