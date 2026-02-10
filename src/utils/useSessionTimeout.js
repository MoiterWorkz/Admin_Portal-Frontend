import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const EVENTS = [
  "mousemove",
  "keydown",
  "click",
  "scroll",
  "touchstart"
];

const useSessionTimeout = () => {
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(logout, SESSION_TIMEOUT);
  };

  useEffect(() => {
    EVENTS.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      EVENTS.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);
};

export default useSessionTimeout;
