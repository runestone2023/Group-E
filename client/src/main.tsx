import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./pages/routers";
import customTheme from "./theme/theme";

import dayjs from "dayjs";
import "dayjs/locale/se";
import "dayjs/locale/vi";
import { I18nextProvider } from "react-i18next";
import i18next from "./locales/i18n";

dayjs.locale(i18next.language);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <MantineProvider theme={customTheme}>
          <ModalsProvider>
            <Notifications position="top-right" />
            <AppRoutes />
          </ModalsProvider>
        </MantineProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
