import { HeaderStyled, TituloH2, Nav } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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
        <TituloH2>Logo</TituloH2>
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
