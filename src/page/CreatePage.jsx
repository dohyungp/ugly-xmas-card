import React, { useState } from "react";
import useStores from "../useStores";
import Header from "../component/Header";
import cakeButton from "../asset/cake-button.svg";
import Cake from "../component/Cake";
import "../App.css";
import CakeWarpper from "../component/CakeWarpper";

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
      <CakeWarpper>
        <Cake
          className={isJump ? "cake" : ""}
          src={cakeButton}
          alt="cake"
          onClick={handleCakeClick}
          onAnimationEnd={handleAnimationFinished}
        />
      </CakeWarpper>
    </div>
  );
}

export default CreatePage;
