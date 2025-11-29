import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import { UserProvider } from "./Contexts/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter basename="/mega">
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
  // </StrictMode>
);
