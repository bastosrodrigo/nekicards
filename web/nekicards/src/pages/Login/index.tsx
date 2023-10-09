import { useState } from "react";

import {
  Container,
  Esquerda,
  Imagem,
  Box,
  Direita,
  H3,
  Form,
  Label,
  Input,
  Button,
} from "./styles";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        senha,
      });
      if (response.status === 200) {
        const { token } = response.data;
        //localStorage.setItem("token", token);
        //console.log("Chegou aqui dentro do IF", token);
        login(token);

        toast.success("Login feito com sucesso!");
        setTimeout(() => {
          {
            navigate("/meuscards");
          }
        }, 2000);
      } else {
        console.error("Falha no login");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };
  return (
    <Container>
      <Box>
        <Esquerda>
          <Imagem src={logo} alt="" />
        </Esquerda>
        <Direita>
          <H3>Faça aqui seu login.</H3>
          <Form>
            <Label htmlFor="email">Digite seu email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <Label htmlFor="senha">Digite sua senha</Label>
            <Input
              type="password"
              id="senha"
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSenha(e.target.value)
              }
            />
            <Button onClick={handleLogin}>ENTRAR</Button>
          </Form>
        </Direita>
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default App;
