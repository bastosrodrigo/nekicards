import { HeaderStyled, Imagem, Nav, Button } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import Modal from "../modal";
import { useState } from "react";

interface Props {
  mycards: boolean;
  voltar: boolean;
}
const Header = ({ mycards, voltar }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    console.log("Agora é true");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    console.log("Agora é false");
  };

  return (
    <>
      <HeaderStyled>
        <Imagem src={logo} alt="" />
        <Nav>
          <>
            {mycards && <Button onClick={handleAddClick}>+ Card</Button>}
            {voltar && (
              <Link to="/meuscards">
                <Button>Voltar</Button>
              </Link>
            )}
          </>
          <Button onClick={handleLogout}>Sair</Button>
        </Nav>
        <Modal isOpen={isModalOpen} onClose={handleModalClose} />
      </HeaderStyled>
    </>
  );
};

export default Header;
