import styled from "styled-components";

export default styled.img`
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  margin: 0;
  &:active {
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    position: absolute;
    margin: 0;
  }
`;
