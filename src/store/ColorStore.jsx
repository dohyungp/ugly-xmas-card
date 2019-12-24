import { observable, action, computed } from "mobx";
import { COUNT_OF_THEME, COUNT_OF_SWEATHER } from "../utils/constant";
import {
  randInt,
  loadModels,
  getFullFaceDescription
} from "../utils/functions";
import greenTheme from "../theme/green";
import blackTheme from "../theme/black";
import purpleTheme from "../theme/purple";
import greenThemeGoButton from "../asset/green-theme-go-button.svg";
import yelloThemeGoButton from "../asset/yellow-theme-go-button.svg";
import blackThemeGoButton from "../asset/black-theme-go-button.svg";
import blueRudolph from "../asset/blue-rudolph.svg";
import lgreenAngola from "../asset/lgreen-angola.svg";
import lgreenRudolph from "../asset/lgreen-rudolph.svg";
import yellowRudolph from "../asset/yellow-rudolph.svg";
import skyRudolph from "../asset/sky-rudolph.svg";
import redAngola from "../asset/red-angola.svg";
import skyAngola from "../asset/sky-angola.svg";
import yellowAngola from "../asset/yellow-angola.svg";

export default class ColorStore {
  @observable themeCode = parseInt(localStorage.getItem("themeCode"));
  @observable sweaterCode = parseInt(localStorage.getItem("sweaterCode"));
  @observable uploadedImage = null;
  @observable imgHeight = 0;
  @observable imgWidth = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    loadModels();
    if (!(this.themeCode + 1)) {
      const randCode = randInt(0, COUNT_OF_THEME - 1);
      this.themeCode = randCode;
      localStorage.setItem("themeCode", randCode);
    }

    if (!(this.sweaterCode + 1)) {
      const randCode = randInt(0, COUNT_OF_SWEATHER - 1);
      this.sweaterCode = randCode;
      localStorage.setItem("sweaterCode", randCode);
    }
  }

  updateSweaterCode = action(() => {
    this.sweaterCode = (this.sweaterCode + 1) % COUNT_OF_SWEATHER;
    localStorage.removeItem("sweaterCode");
    localStorage.setItem("sweaterCode", this.sweaterCode);
  });

  updateThemeCode = action(() => {
    this.themeCode = (this.themeCode + 1) % COUNT_OF_THEME;
    localStorage.removeItem("themeCode");
    localStorage.setItem("themeCode", this.themeCode);
  });

  uploadImage = action((image, height, width) => {
    this.uploadedImage = image;
    this.imgHeight = height;
    this.imgWidth = width;
  });

  getFaceDescription = action(() => {
    const faceDescription = getFullFaceDescription(this.uploadedImage.src, {
      width: this.imgWidth,
      height: this.imgHeight
    });

    faceDescription.then(detection => {
      console.log(detection);
    });
  });

  @computed
  get getTheme() {
    switch (this.themeCode) {
      case 0:
        return greenTheme;
      case 1:
        return purpleTheme;
      case 2:
        return blackTheme;
      default:
        return greenTheme;
    }
  }

  @computed
  get getGoButtonSVG() {
    switch (this.themeCode) {
      case 0:
        return greenThemeGoButton;
      case 1:
        return yelloThemeGoButton;
      case 2:
        return blackThemeGoButton;
      default:
        return greenThemeGoButton;
    }
  }

  @computed
  get getSweaterSVG() {
    switch (this.sweaterCode) {
      case 0:
        return yellowRudolph;
      case 1:
        return blueRudolph;
      case 2:
        return skyRudolph;
      case 3:
        return skyAngola;
      case 4:
        return lgreenRudolph;
      case 5:
        return yellowAngola;
      case 6:
        return redAngola;
      case 7:
        return lgreenAngola;
      default:
        return yellowRudolph;
    }
  }
}
