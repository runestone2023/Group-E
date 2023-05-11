import { LoadingOverlay } from "@mantine/core";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../config/router";
import AppLayout from "../layouts/AppLayout";
import { ConnectionProvider } from "../contexts/ConnectionContext";

const Login = React.lazy(() => import("./Login"));
const _404NotFound = React.lazy(() => import("../components/common/_404NotFound"));
const Home = React.lazy(() => import("../components/Home"));
const Connect = React.lazy(() => import("../components/Connect"));
const Scan = React.lazy(() => import("../components/Scan"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTER.AUTH.LOGIN}
        element={
          <Suspense fallback={<LoadingOverlay color="secondary.9" visible />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTER.HOME.INDEX}
        element={
          <ConnectionProvider>
            <AppLayout />
          </ConnectionProvider>
        }
      >
        <Route path={ROUTER.HOME.INDEX} element={<Home />} />
        <Route path={ROUTER.NAV.CONNECT} element={<Connect />} />
        <Route path={ROUTER.NAV.SCAN} element={<Scan />} />

        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
