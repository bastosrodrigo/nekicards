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

import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qrcode from "../../assets/qrcode.png";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const Editar = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  //const { token } = useAuth();

  const getAll = async () => {
    const tokenN = localStorage.getItem("token");
    console.log("TOKEN", tokenN);
    await api
      .get("/profiles/" + id, {
        headers: {
          Authorization: `Bearer ${tokenN}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAll();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Token não encontrado no Local Storage.");
      return;
    }
    api.put("/profiles/" + id, data).then((response) => {
      toast.success("Perfil atualizado com sucesso!");
      setTimeout(() => {
        {
          navigate("/meuscards");
        }
      }, 2000);
    });
  }

  return (
    <>
      <Header mycards={false} voltar={true} />
      <Container>
        <h1>Editar cartão de {data.nomeCompleto}</h1>
        <Card>
          <CardFront>
            <Box1>
              <P>ID: {data.id}</P>
              <Img src={data.foto} alt="Avatar de perfil" />
            </Box1>
            <Box2>
              <H4>Nome: {data.nomeCompleto}</H4>
              <P>Nome social: {data.nomeSocial}</P>
              <P>Nascimento: {data.dataNascimento}</P>
              <P>Email: {data.email}</P>
              <P>Telefone: {data.telefone}</P>
            </Box2>
          </CardFront>
          <CardBack>
            <CardBackImg src={qrcode} alt="Imagem de um QRCode" />
            <p>
              <a href={data.redesSociais?.linkedin}>
                <AiFillLinkedin size={30} />
              </a>
              <a href={data.redesSociais?.github}>
                <AiFillGithub size={30} />
              </a>
              <a href={data.redesSociais?.instagram}>
                <AiFillInstagram size={30} />
              </a>
              <a href={data.redesSociais?.facebook}>
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled
            />
          </FormDiv>
          <div>
            <Label>Nome Completo*:</Label>
            <Input
              type="text"
              value={data.nomeCompleto}
              onChange={(e) =>
                setData({ ...data, nomeCompleto: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Nome Social:</Label>
            <Input
              type="text"
              value={data.nomeSocial}
              onChange={(e) => setData({ ...data, nomeSocial: e.target.value })}
            />
          </div>
          <div>
            <Label>Data de Nascimento*:</Label>
            <Input
              type="date"
              value={data.dataNascimento}
              onChange={(e) =>
                setData({ ...data, dataNascimento: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Foto*:</Label>
            <Input
              type="text"
              value={data.foto}
              onChange={(e) => setData({ ...data, foto: e.target.value })}
            />
          </div>
          <div>
            <Label>Telefone:</Label>
            <Input
              type="tel"
              value={data.telefone}
              onChange={(e) => setData({ ...data, telefone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="">Linkedin:</Label>
            <Input
              type="text"
              value={data.redesSociais?.linkedin}
              onChange={(e) =>
                setData({
                  ...data,
                  redesSociais: {
                    ...data.redesSociais,
                    linkedin: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="github">Github:</Label>
            <Input
              id="github"
              type="text"
              value={data.redesSociais?.github}
              onChange={(e) =>
                setData({
                  ...data,
                  redesSociais: {
                    ...data.redesSociais,
                    github: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram:</Label>
            <Input
              id="instagram"
              type="text"
              value={data.redesSociais?.instagram}
              onChange={(e) =>
                setData({
                  ...data,
                  redesSociais: {
                    ...data.redesSociais,
                    instagram: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook:</Label>
            <Input
              id="facebook"
              type="text"
              value={data.redesSociais?.facebook}
              onChange={(e) =>
                setData({
                  ...data,
                  redesSociais: {
                    ...data.redesSociais,
                    facebook: e.target.value,
                  },
                })
              }
            />
          </div>

          <Button type="submit">Salvar</Button>
          <ToastContainer />
        </Form>
      </Container>
    </>
  );
};

export default Editar;
