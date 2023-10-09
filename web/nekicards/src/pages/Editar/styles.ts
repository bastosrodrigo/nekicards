import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin-top: 100px;
  background-color: #d0d6ff;
  overflow-x: none;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
`;

export const CardFront = styled.div`
  width: 350px;
  height: 200px;
  background-color: #a1aeff;
  border-radius: 10px;
  display: flex;
`;

export const Img = styled.img`
  height: 100px;
  width: auto;
  flex-shrink: 0;
  border-radius: 5px;
  margin-left: 5px;
`;

export const Box1 = styled.div`
  width: 100px;
  height: 100%;
  text-align: center;
`;

export const Box2 = styled.div`
  width: 250px;
  padding: 10px;
`;

export const H4 = styled.h4`
  margin: 5px;
`;

export const P = styled.p`
  margin: 5px;
`;

export const CardBack = styled.div`
  width: 350px;
  height: 200px;
  background-color: #a1aeff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardBackImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 20px;
`;

export const Input = styled.input`
  width: 300px;
  height: 30px;
`;

export const FormDiv = styled.div``;

export const Label = styled.label``;

export const Button = styled.button`
  background-color: #b09cc2;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;

  :hover {
    background-color: #766d88;
    color: #fff;
    transition: 0.5s;
  }
`;