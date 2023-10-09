import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegistrarCard from "../pages/RegistrarCard";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Publico from "../pages/Publico";
import MeusCards from "../pages/MeusCards";
import AdicionarCards from "../pages/AdicionarCards";
import Editar from "../pages/Editar";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/meuscards" element={<PrivateRoute />}>
            <Route path="/meuscards" element={<MeusCards />} />
          </Route>
          <Route path="/profile/:id" element={<Publico />} />
          <Route path="/adicionar" element={<AdicionarCards />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/regiscard" element={<PrivateRoute />}>
            <Route path="/regiscard" element={<RegistrarCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
