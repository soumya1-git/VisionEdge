import { useEffect } from 'react';

export function useStreamPolling(
  refresh: () => void,
  interval = 5000
) {
  useEffect(() => {
    const timer = setInterval(refresh, interval);

    return () => clearInterval(timer);
  }, [refresh, interval]);
}
