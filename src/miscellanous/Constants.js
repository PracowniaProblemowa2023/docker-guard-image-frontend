const URL = 'http://localhost:PORT';

export const ENDPOINTS = {
  todo: URL + '/add/endpoints'
};

export const ROUTES = {
  WELCOME: '/',
  SCANNER: '/scanner',
  RESULTS: '/results',
  HISTORY: '/history',
  PROFILE: '/profile/:userId',
  NOT_FOUND: '*'
};

export const ERROR = {
  NOT_FOUND: 404,
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  INTERNAL_SERVER_ERROR: 500,
  UNKNOWN: 'UNKNOWN'
};
