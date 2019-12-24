import React, { useState, useRef } from "react";
import useStores from "../useStores";
import { useObserver } from "mobx-react";
import Header from "../component/Header";
import cakeButton from "../asset/cake-button.svg";
import catFaceButton from "../asset/cat-face-button.svg";
import Cake from "../component/Cake";
import HiddenInput from "../component/HiddenInput";
import "../App.css";
// import leftArrow from "../asset/tap-arrow-left.svg";
// import rightArrow from "../asset/tap-arrow-right.svg";
import Sweater from "../component/Sweater";
import Face from "../component/Face";
// import LeftArrow from "../component/LeftArrow";
// import RightArrow from "../component/RightArrow";

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
  const inputEl = useRef(null);

  const handleFaceClick = () => {
    const input = inputEl.current;
    input.click();
  };

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

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        let imgEl = new Image();
        imgEl.src = e.target.result;

        console.log(e.target.result);
        // this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={inputEl}
        capture
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <Header />
      <Sweater src={sweaterSVG} onClick={handleSweaterClick} />
      <Face src={catFaceButton} onClick={handleFaceClick} />
      <Cake
        className={isJump ? "cake" : ""}
        src={cakeButton}
        alt="cake"
        onClick={handleCakeClick}
        onAnimationEnd={handleAnimationFinished}
      />
    </div>
  );
}

export default CreatePage;
