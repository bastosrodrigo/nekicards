import Header from "../../components/header";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import qrcode from "../../assets/qrcode.png";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";

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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDelete = async (id: number) => {
    const tokenN = localStorage.getItem("token");
    try {
      await api.delete(`/profiles/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenN}`,
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
    <div className="container-home">
      <Header mycards={true} />
      <h1>Todos os cartões</h1>
      <div className="cards-home-1">
        {profiles.map((item, index) => (
          <>
            <div className="card-container" key={index}>
              <div className="cards-front">
                <div className="caixa1">
                  <p>ID: {item.id}</p>
                  <img src={item.foto} alt="" />
                </div>
                <div className="caixa2">
                  <h4>Nome: {item.nomeCompleto}</h4>
                  <p>Nome social: {item.nomeSocial}</p>
                  <p>Nascimento: {item.dataNascimento}</p>
                  <p>Email: {item.email}</p>
                  <p>Telefone: {item.telefone}</p>
                </div>
              </div>
              <div className="cards-back">
                <img src={qrcode} alt="" />
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
                <button>EDITAR</button>
                <button onClick={() => handleDelete(item.id)}>DELETAR</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyCards;
