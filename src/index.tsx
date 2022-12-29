import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./contexts/app-context";
import { FormulaContextProvider } from "./contexts/formula-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <FormulaContextProvider>
        <App />
      </FormulaContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
