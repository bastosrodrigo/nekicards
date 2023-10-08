import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrarCard from "../pages/RegistrarCard";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Publico from "../pages/Publico";
import MeusCards from "../pages/MeusCards";
import AdicionarCards from "../pages/AdicionarCards";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/regiscard" element={<RegistrarCard />} />
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/meuscards" element={<MeusCards />} />
        <Route path="/profile/:id" element={<Publico />} />
        <Route path="/adicionar" element={<AdicionarCards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
