import styled from "styled-components";

export default styled.textarea`
  background-attachment: local;
  letter-spacing: 3px;
  line-height: 30px;
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: white;
  background-color: ${props => props.theme.colors.background};
  background-image: linear-gradient(
      to right,
      transparent 10px,
      transparent 10px
    ),
    linear-gradient(to left, transparent 10px, transparent 10px),
    repeating-linear-gradient(
      transparent,
      transparent 30px,
      white 30px,
      white 31px,
      transparent 31px
    );
  width: 80%;
  transform: translate(-50%, -50%);
  left: 50%;
  min-height: 130px;
  padding: 8px 10px;
  margin-top: 110px;
  position: absolute;
  outline: none;
  border: none;
  resize: none;
`;
