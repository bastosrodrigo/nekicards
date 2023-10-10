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
  H1,
  DivTitle,
  Span,
  Ptitle,
} from "./styles";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qrcode from "../../assets/qrcode.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import { Link } from "react-router-dom";

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
  const [contador, setContador] = useState(0);
  const { token } = useAuth();

  const handleGetAll = async () => {
    const tokenN = localStorage.getItem("token");
    console.log(tokenN);
    try {
      const response = await api.get<Profiles[]>("/profiles", {
        headers: {
          Authorization: `Bearer ${tokenN}`,
        },
      });
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
      toast.success("Cartão excluído com sucesso!");
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
      <H1>Todos os cartões</H1>
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
                  <DivTitle>
                    <Span>Nome social:</Span>
                    <Ptitle> {item.nomeSocial}</Ptitle>
                  </DivTitle>
                  <DivTitle>
                    <Span>Nascimento:</Span>
                    <Ptitle> {item.dataNascimento}</Ptitle>
                  </DivTitle>
                  <DivTitle>
                    <Span>Email:</Span>
                    <Ptitle> {item.email}</Ptitle>
                  </DivTitle>
                  <DivTitle>
                    <Span>Telefone:</Span>
                    <Ptitle> {item.telefone}</Ptitle>
                  </DivTitle>
                </Box2>
              </CardFront>
              <CardBack>
                <ImageBack src={qrcode} alt="" />
                <P>
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
                </P>
                <Link
                  to={`/editar/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button>EDITAR</Button>
                </Link>
                <Button onClick={() => handleDelete(item.id)}>DELETAR</Button>
              </CardBack>
            </CardsContainer>
          </>
        ))}
      </Cards>
      <ToastContainer />
    </Container>
  );
};

export default MyCards;
