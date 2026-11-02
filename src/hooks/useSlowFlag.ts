import { useEffect, useState } from "react";
import { SLOW_REQUEST_MS } from "../lib/constants";

/** True once `active` has stayed true for longer than SLOW_REQUEST_MS (free hosting cold start). */
export function useSlowFlag(active: boolean): boolean {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!active) {
      setSlow(false);
      return;
    }
    const timer = window.setTimeout(() => setSlow(true), SLOW_REQUEST_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return slow;
}
