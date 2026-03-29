import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        afterSignOutUrl={"/"}
      >
        <BrowserRouter>
          <App />
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
