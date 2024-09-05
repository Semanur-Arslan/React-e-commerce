import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./colors.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContexts";
import { ToastProvider } from './contexts/ToastContext';

const queryClient = new QueryClient({
  defaultOption: {
    queries: {
      refectOnMount: false,
      refectOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BasketProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BasketProvider>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

reportWebVitals();
