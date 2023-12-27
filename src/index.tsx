import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDom.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("rootElement not found");
}
