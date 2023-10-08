import { HeaderStyled, Imagem, Nav } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

interface Props {
  mycards: boolean;
}
const Header = ({ mycards }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <HeaderStyled>
        <Imagem src={logo} alt="" />
        <Nav>
          <>
            {mycards && (
              <Link to="/home">
                <button>+ Card</button>
              </Link>
            )}
          </>
          <button onClick={handleLogout}>Sair</button>
        </Nav>
      </HeaderStyled>
    </>
  );
};

export default Header;
