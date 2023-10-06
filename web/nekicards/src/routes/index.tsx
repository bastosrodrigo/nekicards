import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Publico from "../pages/Publico";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/profile/:id" element={<Publico />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
