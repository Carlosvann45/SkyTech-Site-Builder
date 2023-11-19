import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

/**
 * Renders app if it is valid
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

/**
 * declares global fileOperations object in window to send
 * requests to electorn backend
 */
declare global {
  interface Window {
    fileOperations: any;
  }
}
