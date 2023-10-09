import Header from "../../components/header";
import {
  Container,
  Cards,
  CardsContainer,
  CardFront,
  Image,
  Box1,
  Box2,
  ImageBack,
  CardBack,
  H4,
  P,
  Button,
} from "./styles";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import qrcode from "../../assets/qrcode.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import { Link } from "react-router-dom";
import Modal from "../../components/modal";

interface Profiles {
  id: number;
  email: string;
  nomeCompleto: string;
  nomeSocial: string;
  dataNascimento: string;
  foto: string;
  telefone: string;
  redesSociais: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
  };
}

const MyCards: React.FC = () => {
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  const handleGetAll = async () => {
    const tokenN = localStorage.getItem("token");
    console.log(tokenN);
    try {
      const response = await axios.get<Profiles[]>(
        "http://localhost:8080/profiles",
        {
          headers: {
            Authorization: `Bearer ${tokenN}`,
          },
        }
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    const confirme = window.confirm("Deseja realmente deletar este cartão?");

    if (!confirme) {
      return;
    }
    try {
      await api.delete(`/profiles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (profiles) {
        const newProfiles = profiles.filter((item) => item.id !== id);
        setProfiles(newProfiles);
      }
    } catch (error) {
      console.log("Erro ao deletar card", error);
    }
  };

  useEffect(() => {
    handleGetAll();
  }, [token]);

  return (
    <Container>
      <Header mycards={true} voltar={false} />
      <h1>Todos os cartões</h1>
      <Cards>
        {profiles.map((item, index) => (
          <>
            <CardsContainer key={index}>
              <CardFront>
                <Box1>
                  <p>ID: {item.id}</p>
                  <Image src={item.foto} alt="Imagem de perfil" />
                </Box1>
                <Box2>
                  <H4>{item.nomeCompleto}</H4>
                  <P>Nome social: {item.nomeSocial}</P>
                  <P>Nascimento: {item.dataNascimento}</P>
                  <P>Email: {item.email}</P>
                  <P>Telefone: {item.telefone}</P>
                </Box2>
              </CardFront>
              <CardBack>
                <ImageBack src={qrcode} alt="" />
                <p>
                  <a href={item.redesSociais.linkedin}>
                    <AiFillLinkedin size={30} />
                  </a>
                  <a href={item.redesSociais.github}>
                    <AiFillGithub size={30} />
                  </a>
                  <a href={item.redesSociais.instagram}>
                    <AiFillInstagram size={30} />
                  </a>
                  <a href={item.redesSociais.facebook}>
                    <AiFillFacebook size={30} />
                  </a>
                </p>
                <Link to={`/editar/${item.id}`}>
                  <Button>EDITAR</Button>
                </Link>
                <Button onClick={() => handleDelete(item.id)}>DELETAR</Button>
              </CardBack>
            </CardsContainer>
          </>
        ))}
      </Cards>
    </Container>
  );
};

export default MyCards;
