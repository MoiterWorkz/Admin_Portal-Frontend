import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AlertProvider, useAlert } from "./components/AlertProvider";
import ThemeSwitcher from "./components/themeSwitcher";
import useSessionTimeout from "./utils/useSessionTimeout";

function AppWrapper() {
  return (
    <AlertProvider>
      <Router basename="/MW-Prepaid">
        <App />
      </Router>
    </AlertProvider>
  );
}

function App() {
  const [role, setRole] = useState("");
  const { showAlert } = useAlert();

  // 🔐 session timeout (NOW SAFE)
  useSessionTimeout();

  // override alert
  useEffect(() => {
    window.alert = (message) => {
      showAlert(message, "info");
    };
  }, [showAlert]);

  // block back button
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <>
      <AppRoutes setRole={setRole} />
      <ThemeSwitcher />
    </>
  );
}

export default AppWrapper;
