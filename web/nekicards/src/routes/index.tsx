import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrarCard from "../pages/RegistrarCard";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Publico from "../pages/Publico";
import MyCards from "../pages/MyCards";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/regiscard" element={<RegistrarCard />} />
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/meuscards" element={<MyCards />} />
        <Route path="/profile/:id" element={<Publico />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
