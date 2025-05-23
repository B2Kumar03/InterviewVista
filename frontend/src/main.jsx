import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ModalCloseProvider } from "./components/context/ModalClose.jsx";
import {UserAuth } from "./components/context/UserAuth.jsx";

createRoot(document.getElementById("root")).render(
  <UserAuth>
    <ModalCloseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalCloseProvider>
  </UserAuth>
);
