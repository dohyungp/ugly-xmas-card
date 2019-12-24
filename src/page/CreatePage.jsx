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
import Compressor from "compressorjs";
// import LeftArrow from "../component/LeftArrow";
// import RightArrow from "../component/RightArrow";

function useSweaterTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    sweaterSVG: colorStore.getSweaterSVG,
    croppedImage: colorStore.croppedImage
  }));
}

function CreatePage() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;
  const { sweaterSVG, croppedImage } = useSweaterTheme();
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
        let imageEl = new Image();
        imageEl.onload = () => {
          colorStore.uploadImage(imageEl, imageEl.height, imageEl.width);
          colorStore.getFaceDescription();
        };
        imageEl.src = e.target.result;
      };
      new Compressor(event.target.files[0], {
        quality: 0.5,
        success(result) {
          reader.readAsDataURL(result);
        }
      });
    }
  };

  return (
    <div>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={inputEl}
        onChange={onImageChange}
      />
      <Header />
      <div>
        <Sweater src={sweaterSVG} onClick={handleSweaterClick} />
        <Face src={croppedImage || catFaceButton} onClick={handleFaceClick} />
        <Cake
          className={isJump ? "cake" : ""}
          src={cakeButton}
          alt="cake"
          onClick={handleCakeClick}
          onAnimationEnd={handleAnimationFinished}
        />
      </div>
    </div>
  );
}

export default CreatePage;
