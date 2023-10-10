import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Publico from "../pages/Publico";
import MeusCards from "../pages/MeusCards";
import Editar from "../pages/Editar";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/meuscards" element={<PrivateRoute />}>
            <Route path="/meuscards" element={<MeusCards />} />
          </Route>
          <Route path="/profile/:id" element={<Publico />} />
          <Route path="/editar/:id" element={<Editar />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
