import React from "react";
import { useObserver } from "mobx-react";
import { ThemeProvider } from "styled-components";
import Container from "./component/Container";
import useStores from "./useStores";
import StartPage from "./page/StartPage";

function useColorTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    colorTheme: colorStore.getTheme,
    goButtonSVG: colorStore.getGoButtonSVG
  }));
}

function App() {
  const { colorTheme, goButtonSVG } = useColorTheme();
  return (
    <ThemeProvider theme={colorTheme}>
      <Container>
        <StartPage goButtonSVG={goButtonSVG} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
