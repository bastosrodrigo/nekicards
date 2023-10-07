import axios from "axios";
import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import qrcode from "../../assets/qrcode.png";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import Header from "../../components/header";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RegistrarCard = () => {
  const { logout } = useAuth();
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [validarEmail, setValidarEmail] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@(neki-it\.com\.br|neki\.com\.br)$/;

    const valido = emailRegex.test(email);
    setValidarEmail(valido);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !nomeCompleto || !dataNascimento || !foto) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        console.error("Token não encontrado no Local Storage.");
        return;
      }
      const response = await axios.post("http://localhost:8080/profiles", {
        email: email,
        nomeCompleto: nomeCompleto,
        nomeSocial: nomeSocial,
        dataNascimento: dataNascimento,
        foto: foto,
        telefone: telefone,
        redesSociais: {
          linkedin: "",
          github: "",
          instagram: "",
          facebook: "",
        },
      });
      console.log("Resposta da API:", response.data);

      setEmail("");
      setNomeCompleto("");
      setNomeSocial("");
      setDataNascimento("");
      setFoto("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Header mycards={false} />
      <div className="container-home-2">
        <div className="cards-home">
          <div className="cards-front">
            <div className="caixa1">
              <img src={avatar} alt="" />
            </div>
            <div className="caixa2">
              <h4>Nome: {nomeCompleto}</h4>
              <p>Nome social: {nomeSocial}</p>
              <p>Data nascimento: {dataNascimento}</p>
              <p>Email: {email}</p>
              <p>Telefone: {telefone}</p>
            </div>
          </div>
          <div className="cards-back">
            <img src={qrcode} alt="" />
            <p>
              <AiFillLinkedin size={30} />
              <AiFillGithub size={30} />
              <AiFillInstagram size={30} />
              <AiFillFacebook size={30} />
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-home">
          <div>
            <label>E-mail*:</label>
            <input
              type="email"
              value={email}
              onChange={handleValidEmail}
              required
            />
            {!validarEmail && (
              <p>
                O email deve terminar com "@neki-it.com.br" ou "@neki.com.br"
              </p>
            )}
          </div>
          <div>
            <label>Nome Completo*:</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nome Social:</label>
            <input
              type="text"
              value={nomeSocial}
              onChange={(e) => setNomeSocial(e.target.value)}
            />
          </div>
          <div>
            <label>Data de Nascimento*:</label>
            <input
              type="text"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Foto*:</label>
            <input
              type="text"
              onChange={(e) => setFoto(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Linkedin:</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Github:</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Instagram:</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Facebook:</label>
            <input type="text" />
          </div>

          <button type="submit" disabled={!validarEmail}>
            Enviar
          </button>
          <div></div>
        </form>
      </div>
    </>
  );
};

export default RegistrarCard;
