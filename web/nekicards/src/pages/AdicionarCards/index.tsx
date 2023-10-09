import {
  Container,
  Card,
  CardFront,
  Img,
  Box1,
  Box2,
  H4,
  P,
  CardBack,
  CardBackImg,
  Form,
  Input,
  FormDiv,
  Label,
  Button,
} from "./styles";

import React, { useState } from "react";
import Header from "../../components/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/avatar.png";
import qrcode from "../../assets/qrcode.png";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AdicionarCards = () => {
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
        navigate("/meuscards");

        setEmail("");
        setNomeCompleto("");
        setNomeSocial("");
        setDataNascimento("");
        setFoto("");
        setTelefone("");
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
    <>
      <Header mycards={false} voltar={true} />
      <Container>
        <h1>ADICIONAR CARTÃO</h1>
        <Card>
          <CardFront>
            <Box1>
              <Img src={avatar} alt="Avatar de perfil" />
            </Box1>
            <Box2>
              <H4>Nome: {nomeCompleto}</H4>
              <P>Nome social: {nomeSocial}</P>
              <P>Nascimento: {dataNascimento}</P>
              <P>Email: {email}</P>
              <P>Telefone: {telefone}</P>
            </Box2>
          </CardFront>
          <CardBack>
            <CardBackImg src={qrcode} alt="Imagem de um QRCode" />
            <p>
              <a href={linkedin}>
                <AiFillLinkedin size={30} />
              </a>
              <a href={github}>
                <AiFillGithub size={30} />
              </a>
              <a href={instagram}>
                <AiFillInstagram size={30} />
              </a>
              <a href={facebook}>
                <AiFillFacebook size={30} />
              </a>
            </p>
          </CardBack>
        </Card>
        <H4>Dados pessoais:</H4>
        <Form onSubmit={handleSubmit}>
          <FormDiv>
            <Label htmlFor="email">E-mail*:</Label>
            <Input
              id="email"
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
          </FormDiv>
          <div>
            <Label>Nome Completo*:</Label>
            <Input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Nome Social:</Label>
            <Input
              type="text"
              value={nomeSocial}
              onChange={(e) => setNomeSocial(e.target.value)}
            />
          </div>
          <div>
            <Label>Data de Nascimento*:</Label>
            <Input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Foto*:</Label>
            <Input
              type="text"
              onChange={(e) => setFoto(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Telefone:</Label>
            <Input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </Form>

        <h4>Redes Sociais:</h4>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="">Linkedin:</Label>
            <Input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="github">Github:</Label>
            <Input
              id="github"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram:</Label>
            <Input
              id="instagram"
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook:</Label>
            <Input
              id="facebook"
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={!validarEmail}>
            Enviar
          </Button>
          <ToastContainer />
        </Form>
      </Container>
    </>
  );
};

export default AdicionarCards;
