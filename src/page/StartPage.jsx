import React from "react";
import useStores from "../useStores";
import { Link } from "react-router-dom";
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
      <Link to="/create">
        <StartButton src={goButtonSVG} alt="GO" />
      </Link>
      <CatTV />
      <StartBackground />
    </>
  );
}

export default StartPage;
