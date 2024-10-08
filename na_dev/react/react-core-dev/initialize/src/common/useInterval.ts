import { MutableRefObject, useEffect, useRef } from "react";

const useInterval = (callback:any, delay:any) => {
  const savedCallback:MutableRefObject<any> = useRef<MutableRefObject<any>>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
