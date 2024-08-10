import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./css/index.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { UIContextProvider } from "./store/ui-context";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Router>
            <UIContextProvider>
              <App />
            </UIContextProvider>
          </Router>
        </CookiesProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
