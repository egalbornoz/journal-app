import { Routes, Route, Navigate } from "react-router-dom";
import { JournalPages } from "../pages/JournalPages";
export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPages />} />
      {/* Cualquier otra ruta se envia a */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
