import React, { useState, useRef } from "react";
import useStores from "../useStores";
import { useObserver } from "mobx-react";
import Header from "../component/Header";
import CharacterWarpper from "../component/CharacterWarpper";
import cakeButton from "../asset/cake-button.svg";
import catFaceButton from "../asset/cat-face-button.svg";
import Cake from "../component/Cake";
import HiddenInput from "../component/HiddenInput";
import "../App.css";
import share from "../asset/share.svg";
import leftArrow from "../asset/tap-arrow-left.svg";
import santaHat from "../asset/santa-hat.svg";
import rightArrow from "../asset/tap-arrow-right.svg";
import Sweater from "../component/Sweater";
import Face from "../component/Face";
import Compressor from "compressorjs";
import LeftArrow from "../component/LeftArrow";
import RightArrow from "../component/RightArrow";
import SantaHat from "../component/SantaHat";
import TextArea from "../component/TextArea";
import TextAreaWrapper from "../component/TextAreaWrapper";
import ShareButton from "../component/ShareButton";
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
        quality: 0.3,
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
      <CharacterWarpper>
        <Sweater src={sweaterSVG} onClick={handleSweaterClick} />
        <Face src={croppedImage || catFaceButton} onClick={handleFaceClick} />
        <Cake
          className={isJump ? "cake" : ""}
          src={cakeButton}
          alt="cake"
          onClick={handleCakeClick}
          onAnimationEnd={handleAnimationFinished}
        />
        <LeftArrow src={leftArrow} />
        <RightArrow src={rightArrow} />
        {croppedImage ? <SantaHat src={santaHat} /> : ""}
      </CharacterWarpper>
      <TextAreaWrapper>
        <TextArea placeholder="Please type ..." />
      </TextAreaWrapper>
      <ShareButton src={share} />
    </div>
  );
}

export default CreatePage;
