import styled from "styled-components";

export default styled.img`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  &:active {
    position: fixed;
    bottom: 0;
    left: 50%;

    transform: translate(-50%, -50%) scale(0.9);
  }
`;
