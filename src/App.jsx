import React from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Container from "./component/Container";
import { getTheme } from "./utils/functions";

function App() {
  return (
    <ThemeProvider theme={getTheme(0)}>
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
