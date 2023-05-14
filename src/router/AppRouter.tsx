/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoute />} />
      )}

      {/* Ruta por defecto */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
