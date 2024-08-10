import { isLocal } from '@utils/commonUtil';
// ----------------------------------------------------------------------

export const DEFAULT_ADMIN_PATH = import.meta.env.BASE_URL;

export const PUBLIC_URL = isLocal() ? '' : DEFAULT_ADMIN_PATH;

 
const ROOTS_MANAGEMENT = '/management';
const ROOTS_SAMPLE = '/sample';
const ROOTS_CONFIG = '/config';

function path(root, sublink) {
  return `${DEFAULT_ADMIN_PATH}${root}${sublink}`;
}



export const PATH_AUTH = {
  login: '/public/user/auth/identifier',
  // login: '/user/auth/identifier',
};

export const PATH_ROOT = {
  baseUrl: DEFAULT_ADMIN_PATH,
};

export const PATH_MANAGEMENT = {
  root: ROOTS_MANAGEMENT,
  client: path(ROOTS_MANAGEMENT, '/client'),
  roles: path(ROOTS_MANAGEMENT, '/roles'),
  user: path(ROOTS_MANAGEMENT, '/user'),
  social: path(ROOTS_MANAGEMENT, '/social'),
  authType: path(ROOTS_MANAGEMENT, '/authType'),
	loginHistory: path(ROOTS_MANAGEMENT, '/loginHistory'),
  loginAnalytics: path(ROOTS_MANAGEMENT, '/loginAnalytics'),
	role: path(ROOTS_MANAGEMENT, '/role'),
}

export const PATH_SAMPLE = {
  root: ROOTS_SAMPLE,
  modal : path(ROOTS_SAMPLE, '/modal'),
}

export const PATH_CONFIG= {
  root: ROOTS_CONFIG,
  loginConfig : path(ROOTS_CONFIG, '/loginConfig'),
}


