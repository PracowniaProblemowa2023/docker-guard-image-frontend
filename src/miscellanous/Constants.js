const URL = process.env.REACT_APP_BACKEND_URL;

export const ENDPOINTS = {
  PROFILE: URL + '/profile'
};

export const ROUTES = {
  WELCOME: '/',
  SCANNER: '/scanner',
  RESULTS: '/results',
  HISTORY: '/history',
  PROFILE: '/profile',
  NOT_FOUND: '*'
};

export const ERROR = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  UNKNOWN: 'UNKNOWN'
};
