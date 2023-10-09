import styled from "styled-components";

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  margin-bottom: 20px;
  background-color: #04050d;
`;

export const Imagem = styled.img`
  width: 80px;
  margin-left: 20px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding-right: 20px;
`;

export const Button = styled.button`
  background-color: #b09cc2;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #766d88;
    color: #000;
    transition: 0.5s;
  }
`;
