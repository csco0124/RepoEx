const USER_AUTH = import.meta.env.VITE_USER_AUTH;
const USER_SOCIAL = import.meta.env.VITE_USER_SOCIAL;

export const authPath = (url: string) => {
  if (!url) throw new Error('url is required');
  return url.startsWith('/') ? `${USER_AUTH}${url}` : `/${USER_AUTH}${url}`;
  //return `${url}`;
};

export const socialPath = (url: string) => {
  if (!url) throw new Error('url is required');
  return url.startsWith('/') ? `${USER_SOCIAL}${url}` : `/${USER_SOCIAL}${url}`;
  //return `${url}`;
};