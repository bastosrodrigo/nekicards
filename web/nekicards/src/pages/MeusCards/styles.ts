import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
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

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const CardFront = styled.div`
  width: 360px;
  height: 200px;
  background-color: #a1aeff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: flex;

  @media (max-width: 320px) {
    width: 320px;
  }
`;

export const Image = styled.img`
  height: 90px;
  width: 90px;
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
  width: 360px;
  height: 200px;
  background-color: #a1aeff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 320px) {
    width: 320px;
  }
`;

export const H4 = styled.h4`
  text-align: center;
  margin: 5px;
  padding-bottom: 15px;
`;

export const H1 = styled.h1`
  color: #000;
`;
export const P = styled.p`
  margin: 5px;
`;

export const Button = styled.button`
  background-color: #b09cc2;
  border-radius: 2px;
  font-weight: bold;
  border: none;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #766d88;
    color: #000;
    transition: 0.5s;
  }
`;

export const DivTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 0;
`;

export const Span = styled.span`
  font-weight: bold;
`;

export const Ptitle = styled.p`
  margin: 0;
`;
