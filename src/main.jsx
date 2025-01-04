import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Main.jsx is running");
const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Render completed");
} catch (error) {
  console.error("Render error:", error);
}
