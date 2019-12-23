import React, { useState } from "react";
import useStores from "../useStores";
import Header from "../component/Header";
import cakeButton from "../asset/cake-button.svg";
import Cake from "../component/Cake";
import "../App.css";
import MakerWarpper from "../component/MakerWarpper";
import Sweater from "../component/Sweater";

function CreatePage() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;
  const [isJump, setJump] = useState(false);

  const handleCakeClick = () => {
    colorStore.updateThemeCode();
    setJump(true);
  };

  const handleAnimationFinished = () => {
    setJump(false);
  };

  return (
    <div>
      <Header />
      <MakerWarpper>
        <Sweater />
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
