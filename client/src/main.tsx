import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl={"/"}
    >
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
