import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import axios, { AxiosResponse } from "axios";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  /*
  const handleLogin = async () => {
    if (email && senha) {
      const isLogged = await auth.signin(email, senha);
      if (isLogged) {
        navigate("/");
      } else {
        alert("NÃO DEU CERTO");
      }
    }
  };
*/

  interface ApiResponse {
    token: string;
    // Adicione outros campos, se necessário, com base na estrutura da resposta da API
  }

  const handleLogin = async (): Promise<void> => {
    if (email && senha) {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.post(
          "http://localhost:8080/login",
          {
            email: email,
            senha: senha,
          }
        );

        if (response.status === 200) {
          // Autenticação bem-sucedida
          const data: ApiResponse = response.data;
          const token: string = data.token; // Supondo que a API retorna um token

          // Guarde o token em algum lugar (por exemplo, localStorage ou cookies)
          // Redirecione o usuário para a página principal
          navigate("/");
        } else {
          // Autenticação falhou
          alert("NÃO DEU CERTO");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  return (
    <div>
      <h2>Página fechada</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
      />
      <input
        type="text"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
      />

      <button onClick={handleLogin}>LOGAR</button>
    </div>
  );
};
