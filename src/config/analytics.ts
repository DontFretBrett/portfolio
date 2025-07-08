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

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    ...(label && { label }),
  });
}; 