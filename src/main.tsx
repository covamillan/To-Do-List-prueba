import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.scss";

createRoot(document.querySelector(".root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
