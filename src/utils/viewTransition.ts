// Lightweight wrapper around the View Transition API for SPA route changes.
// Docs: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
// The callback may be async, matching the underlying API's Promise-aware design.

type TransitionCallback = () => void | Promise<void>;

function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function startViewTransition(callback: TransitionCallback) {
  // Always run the callback; bail out early if we shouldn't animate.
  if (typeof document === 'undefined' || shouldReduceMotion()) {
    callback();
    return;
  }

  const anyDocument = document as Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => unknown;
  };

  if (typeof anyDocument.startViewTransition !== 'function') {
    callback();
    return;
  }

  // Let the browser manage the snapshots and animation; we just wrap the DOM update.
  // IMPORTANT: return the callback result so the View Transition API can await
  // any Promise it returns before capturing the new DOM snapshot.
  anyDocument.startViewTransition(() => callback());
}


