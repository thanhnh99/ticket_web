export type some = { [key: string]: any };

type CA_ID = 1 | 17;

export const CA_ID: CA_ID = 17;

export const MT_ID: CA_ID = 17;

export const DEV = process.env.NODE_ENV === 'development';
// export const DEV = true;

export const TEST =
  window.location.hostname.startsWith('mytour.tripi') ||
  window.location.hostname.indexOf('-dev.') >= 0;

export const STAGING = window.location.hostname.startsWith('stage.');

export const SUCCESS_CODE = 200;

export const TOKEN = 'token';

export const PAGE_SIZE = 10;

export const ROW_PER_PAGE = [10, 20, 30, 50];

export const TABLET_WIDTH_NUM = 1024;
export const MIN_TABLET_WIDTH_NUM = 750;
export const MOBILE_WIDTH_NUM = 480;
export const DESKTOP_WIDTH_NUM = 1260;

export const KEY_GOOGLE_MAP = 'AIzaSyCktZ4VE5hoHILLG6N2M7XxCt-Zlq6HsdI';
