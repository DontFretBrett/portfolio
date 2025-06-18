/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gradio-app': {
        src?: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export {};
