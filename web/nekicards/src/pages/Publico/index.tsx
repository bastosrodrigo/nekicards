import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

import "./styles.css";

interface Profile {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
}

const Publico: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  let { id } = useParams();

  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/profiles/${id}`)
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
        <h1>Compartilhe seu card com seus amigos</h1>
        <div className="card">
          <div className={isFront ? "front" : "back"}>
            {isFront ? (
              <div>
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4794/4794936.png"
                    alt=""
                  />
                </div>
                <p>Frente do cartão 1</p>
                <p>Telefone: {profile.telefone}</p>
              </div>
            ) : (
              <div>
                <p>Frente do cartão 1</p>
                <p>Telefone: {profile.telefone}</p>
              </div>
            )}
          </div>
          <div className={isFront ? "back" : "front"}>
            {isFront ? (
              <div>
                <p>Verso do cartão 2</p>
                <p>ID: {profile.id}</p>
                <nav className="rede-sociais">
                  <a href={profile.id}>
                    <AiFillLinkedin size={30} />
                  </a>
                  <a href={profile.id}>
                    <AiFillGithub size={30} />
                  </a>
                  <a href={profile.id}>
                    <AiFillInstagram size={30} />
                  </a>
                  <a href={profile.id}>
                    <AiFillFacebook size={30} />
                  </a>
                </nav>
              </div>
            ) : (
              <div>
                <p>Verso do cartão 2</p>
                <p>ID: {profile.id}</p>
              </div>
            )}
          </div>
        </div>
        <p>Passe o mouse no card</p>
      </div>
    </div>
  );
};

export default Publico;
