const URL = 'http://localhost:8443/api/v1';

export const ENDPOINTS = {
  PROFILE: URL + '/profile',
  HISTORY: URL + '/imagescan',
  SCAN_RESULT: URL + '/imagescan/result',
  SHARE_SCAN_RESULT: URL + '/fileaccess'
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
