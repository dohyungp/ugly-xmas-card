import React from "react";
import { useObserver } from "mobx-react";
import { ThemeProvider } from "styled-components";
import Container from "./component/Container";
import useStores from "./useStores";
import "./App.css";

function useColorTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    colorTheme: colorStore.getTheme()
  }));
}

function App() {
  const { colorTheme } = useColorTheme();
  return (
    <ThemeProvider theme={colorTheme}>
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
