import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  width: 100vw;
  background-color: #d0d6ff;
  overflow-x: none;
`;

export const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const CardFront = styled.div`
  width: 350px;
  height: 200px;
  background-color: #a1aeff;
  border-radius: 10px;
  display: flex;
`;

export const Image = styled.img`
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

export const ImageBack = styled.img`
  width: 50px;
  height: 50px;
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

export const H4 = styled.h4`
  text-align: center;
  margin: 5px;
`;
export const P = styled.p`
  margin: 5px;
`;

export const Button = styled.button`
  background-color: #b09cc2;
  border-radius: 2px;
  font-weight: bold;
  border: none;
  height: 5px;
  margin: 5px;
  cursor: pointer;

  :hover {
    background-color: #766d88;
    color: #711188;
    transition: 0.5s;
  }
`;
