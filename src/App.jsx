import React from "react";
import { useObserver } from "mobx-react";
import { ThemeProvider } from "styled-components";
import Container from "./component/Container";
import StartButton from "./component/StartButton";
import useStores from "./useStores";
import StartBackground from "./component/StartBackground";
import CatTV from "./component/CatTV";

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
        <StartButton src={goButtonSVG} alt="GO" />
        <CatTV />
        <StartBackground />
      </Container>
    </ThemeProvider>
  );
}

export default App;
