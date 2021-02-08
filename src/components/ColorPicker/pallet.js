import styled from "styled-components";

export const Pallet = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid
    ${(props) => (props.color === "white" ? "#ccc" : props.color)};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 5px rgba(17, 16, 62, 0.15);
  }
`;
