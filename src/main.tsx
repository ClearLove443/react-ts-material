import { StyledEngineProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CustomerPage from "./page/customer-page.tsx";
import "./style.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <CustomerPage />
      {/* <Demo /> */}
    </StyledEngineProvider>
  </StrictMode>
);
