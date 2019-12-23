import styled from "styled-components";
import leftCatTV from "../asset/left-cat-tv.png";
import rightCatTV from "../asset/right-cat-tv.png";

export default styled.div`
  background-image: url(${leftCatTV}), url(${rightCatTV});
  width: 60%;
  max-width: 230px;
  height: 64px;
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center left, center right;
  transform: translate(-50%, -50%);
  top: 90%;
  left: 50%;
`;
