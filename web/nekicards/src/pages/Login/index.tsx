import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function App() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        senha,
      });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("Chegou aqui dentro do IF", token);
        login(token);
        navigate("/home");
      } else {
        console.error("Falha no login");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };

  return (
    <div className="container-login">
      <div className="box-login">
        <div className="content-esquerda">
          <img src={logo} alt="" />
        </div>
        <div className="content-direita">
          <h3>Faça aqui seu login.</h3>
          <div className="login-form">
            <label htmlFor="email">Digite seu email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="senha">Digite sua senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>ENTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
