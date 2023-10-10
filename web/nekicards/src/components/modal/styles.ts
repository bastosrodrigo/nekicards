import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Span = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 250px;
  height: 30px;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

export const Div = styled.div``;

export const Button = styled.button`
  background-color: #b09cc2;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: #766d88;
    color: #000;
    transition: 0.5s;
  }
`;

export const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 100% 100%;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
  width: 300px;

  @media (max-width: 630px) {
    display: initial;
  }
`;
