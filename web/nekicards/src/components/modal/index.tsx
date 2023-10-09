import React, { useState, useEffect } from "react";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, onSave }: any) => {
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [validarEmail, setValidarEmail] = useState<boolean>(true);
  const navigate = useNavigate();
  //const { token } = useAuth();
  const tokenN = localStorage.getItem("token");

  const handleValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@(neki-it\.com\.br|neki\.com\.br)$/;

    const valido = emailRegex.test(email);
    setValidarEmail(valido);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        console.error("Token não encontrado no Local Storage.");
        return;
      }
      const response = await api.post("/profiles", {
        email: email,
        nomeCompleto: nomeCompleto,
        nomeSocial: nomeSocial,
        dataNascimento: dataNascimento,
        foto: foto,
        telefone: telefone,
        redesSociais: {
          linkedin: linkedin,
          github: github,
          instagram: instagram,
          facebook: facebook,
        },
      });
      console.log("Resposta da API:", response.data);
      toast.success("Perfil criado com sucesso!");
      setTimeout(() => {
        onClose();

        setEmail("");
        setNomeCompleto("");
        setNomeSocial("");
        setDataNascimento("");
        setFoto("");
        setTelefone("");
        setLinkedin("");
        setGithub("");
        setInstagram("");
        setFacebook("");
      }, 5000);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("O email já está em uso. Por favor, escolha outro.");
      } else {
        console.error("Erro ao enviar dados para a API:", error);
      }
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <span>Cadastrar novo cartão</span>
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
        </form>
        <button onClick={handleSubmit} disabled={!validarEmail}>
          Salvar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
