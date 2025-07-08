import ReactGA from 'react-ga4';

// GA4 Measurement ID
const MEASUREMENT_ID = 'G-V4R29ZNVC3';

export const initGA = () => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        cookieFlags: 'SameSite=None;Secure',
      },
    });
  }
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export type GAEventParams = {
  [key: string]: string | number | boolean;
};

export const logEvent = (event_name: string, params?: GAEventParams) => {
  ReactGA.event(event_name, params);
}; 