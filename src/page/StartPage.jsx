import React from "react";
import useStores from "../useStores";
import { useObserver } from "mobx-react";
import StartButton from "../component/StartButton";
import StartBackground from "../component/StartBackground";
import CatTV from "../component/CatTV";

function useColorTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    goButtonSVG: colorStore.getGoButtonSVG
  }));
}

function StartPage() {
  const { goButtonSVG } = useColorTheme();
  return (
    <>
      <StartButton src={goButtonSVG} alt="GO" />
      <CatTV />
      <StartBackground />
    </>
  );
}

export default StartPage;
