import React, { useEffect, useState } from "react";
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

interface Profile {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  redesSociais: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
  };
}

const Publico: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  let { id } = useParams();

  const [isFront, setIsFront] = useState(true);

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
    <div className="container">
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
                    <p>Nome social: {profile.nomeSocial}</p>
                    <p>Nascimento: {profile.dataNascimento}</p>
                    <p>Email: {profile.email}</p>
                    <p>Telefone: {profile.telefone}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
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
    </div>
  );
};

export default Publico;
