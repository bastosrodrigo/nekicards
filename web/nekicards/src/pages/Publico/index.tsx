import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import qrcode from "../../assets/qrcode.png";
import { useParams } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import "./styles.css";
import api from "../../api";

const Publico: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  let { id } = useParams();

  const [isFront] = useState(true);

  useEffect(() => {
    api
      .get(`/profiles/${id}`)
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados", error);
      });
  }, []);

  return (
    <Container>
      <div className="box">
        <h1>Compartilhe seu cartão com seus amigos!</h1>
        <div className="card">
          <div className={isFront ? "front" : "back"}>
            {isFront ? (
              <div className="cards-home">
                <div className="cards-front">
                  <div className="caixa1">
                    <p>ID: {profile.id}</p>
                    <img src={profile.foto} alt="" />
                  </div>
                  <div className="caixa2">
                    <h4>{profile.nomeCompleto}</h4>
                    <div className="divtitle">
                      <span>Nome social:</span>
                      <p> {profile.nomeSocial}</p>
                    </div>
                    <div className="divtitle">
                      <span>Nascimento:</span>
                      <p> {profile.dataNascimento}</p>
                    </div>
                    <div className="divtitle">
                      <span>Email:</span>
                      <p> {profile.email}</p>
                    </div>
                    <div className="divtitle">
                      <span>Telefone:</span>
                      <p> {profile.telefone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cards-home">
                <div className="cards-back">
                  <img src={qrcode} alt="Imagem de QRCode" />
                  <p>
                    <a href={profile.linkedin}>
                      <AiFillLinkedin size={30} />
                    </a>
                    <a href={profile.github}>
                      <AiFillGithub size={30} />
                    </a>
                    <a href={profile.instagram}>
                      <AiFillInstagram size={30} />
                    </a>
                    <a href={profile.facebook}>
                      <AiFillFacebook size={30} />
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={isFront ? "back" : "front"}>
            {isFront ? (
              <div className="cards-home">
                <div className="cards-back">
                  <img src={qrcode} alt="" />
                  <p>
                    <a href={profile.linkedin}>
                      <AiFillLinkedin size={30} />
                    </a>
                    <a href={profile.github}>
                      <AiFillGithub size={30} />
                    </a>
                    <a href={profile.instagram}>
                      <AiFillInstagram size={30} />
                    </a>
                    <a href={profile.facebook}>
                      <AiFillFacebook size={30} />
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <p>Passe o mouse no cartão</p>
      </div>
    </Container>
  );
};

export default Publico;
