import React, { useState } from "react";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Div,
  DivButton,
  Input,
  Label,
  ModalContainer,
  ModalContent,
  Span,
  Form,
} from "./styles";

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

  const handleValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@(neki-it\.com\.br|neki\.com\.br)$/;

    const valido = emailRegex.test(email);
    setValidarEmail(valido);
  };

  const handleSubmit = async (e: any) => {
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
    <ModalContainer className={`modal ${isOpen ? "open" : "closed"}`}>
      <ModalContent>
        <Span>Cadastrar novo cartão</Span>
        <Form onSubmit={handleSubmit}>
          <Div>
            <Label>E-mail*:</Label>
            <Input
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
          </Div>
          <Div>
            <Label>Nome Completo*:</Label>
            <Input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </Div>
          <Div>
            <Label>Nome Social:</Label>
            <Input
              type="text"
              value={nomeSocial}
              onChange={(e) => setNomeSocial(e.target.value)}
            />
          </Div>
          <Div>
            <Label>Data de Nascimento*:</Label>
            <Input
              type="text"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </Div>
          <Div>
            <Label>Foto*:</Label>
            <Input
              type="text"
              onChange={(e) => setFoto(e.target.value)}
              required
            />
          </Div>
          <Div>
            <Label>Telefone:</Label>
            <Input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Div>
          <Div>
            <Label htmlFor="">Linkedin:</Label>
            <Input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </Div>
          <Div>
            <Label htmlFor="">Github:</Label>
            <Input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Div>
          <Div>
            <Label htmlFor="">Instagram:</Label>
            <Input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </Div>
          <Div>
            <Label htmlFor="">Facebook:</Label>
            <Input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </Div>
        </Form>
        <DivButton>
          <Button onClick={handleSubmit} disabled={!validarEmail}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </DivButton>
      </ModalContent>
      <ToastContainer />
    </ModalContainer>
  );
};

export default Modal;
