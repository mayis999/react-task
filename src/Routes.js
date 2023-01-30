import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/detailPage/detailPage";
import HomePage from "./pages/homePage/homePage";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";

export default function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<DetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
