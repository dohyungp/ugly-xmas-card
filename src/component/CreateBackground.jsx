import styled from "styled-components";
import createBackground from "../asset/create-background.png";

export default styled.div`
  background-image: url(${createBackground});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: contain;
  height: 50vh;
  width: 100%;
`;
