import styled, { keyframes } from "styled-components";

const jump = keyframes`
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  20% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  50% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  60% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
  }
  80% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

export default styled.div`
  -webkit-animation: ${jump} 1s ease 0s normal;
  animation: ${jump} 1s ease 0s normal;
`;
