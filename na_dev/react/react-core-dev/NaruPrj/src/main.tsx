import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { UIContextProvider } from "./store/ui-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./index.css";
import "./i18n/i18n";
import App from "./App";
import { NavermapsProvider } from "react-naver-maps";
import { UtilityProvider } from "./store/UtilityContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <UtilityProvider>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <UIContextProvider>
              {/* <Map> */}
              <NavermapsProvider ncpClientId="n3xpry6glm">
                <App />
              </NavermapsProvider>
              {/* </Map> */}
            </UIContextProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </UtilityProvider>
    </Provider>
  </React.StrictMode>
);
