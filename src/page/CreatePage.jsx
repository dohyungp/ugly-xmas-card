import React, { useState } from "react";
import useStores from "../useStores";
import { useObserver } from "mobx-react";
import Header from "../component/Header";
import cakeButton from "../asset/cake-button.svg";
import Cake from "../component/Cake";
import "../App.css";
import MakerWarpper from "../component/MakerWarpper";
import Sweater from "../component/Sweater";

function useSweaterTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    sweaterSVG: colorStore.getSweaterSVG
  }));
}

function CreatePage() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;
  const { sweaterSVG } = useSweaterTheme();
  const [isJump, setJump] = useState(false);

  const handleCakeClick = () => {
    colorStore.updateThemeCode();
    setJump(true);
  };

  const handleSweaterClick = () => {
    colorStore.updateSweaterCode();
  };

  const handleAnimationFinished = () => {
    setJump(false);
  };

  return (
    <div>
      <Header />
      <MakerWarpper>
        <Sweater src={sweaterSVG} onClick={handleSweaterClick} />
        <Cake
          className={isJump ? "cake" : ""}
          src={cakeButton}
          alt="cake"
          onClick={handleCakeClick}
          onAnimationEnd={handleAnimationFinished}
        />
      </MakerWarpper>
    </div>
  );
}

export default CreatePage;
