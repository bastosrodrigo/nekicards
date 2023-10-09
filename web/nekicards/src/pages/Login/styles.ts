import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(6, 4, 19);
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 800px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const Esquerda = styled.div`
  flex: 1;
  text-align: center;
`;

export const Imagem = styled.img`
  max-width: 100%;
  height: auto;

  @media (max-width: 425px) {
    width: 200px;
  }
`;

export const Direita = styled.div`
  flex: 1;
  padding: 20px;
`;

export const H3 = styled.h3`
  text-align: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  height: 30px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #b09cc2;
  color: #000;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #766d88;
    color: #fff;
    transition: 0.5s;
  }
`;
