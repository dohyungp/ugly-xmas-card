import React from "react";
import StartButton from "../component/StartButton";
import StartBackground from "../component/StartBackground";
import CatTV from "../component/CatTV";

function StartPage({ goButtonSVG }) {
  return (
    <>
      <StartButton src={goButtonSVG} alt="GO" />
      <CatTV />
      <StartBackground />
    </>
  );
}

export default StartPage;
