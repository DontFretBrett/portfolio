/// <reference types="vite/client" />

// Add support for importing markdown files as raw text
declare module "*.md?raw" {
  const content: string;
  export default content;
}

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
