import styled from "styled-components";

export const ContextMenu = styled.ul`
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  li {
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
    }
  }
`;
