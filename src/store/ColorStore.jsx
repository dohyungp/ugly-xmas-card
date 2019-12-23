import { observable, action, computed } from "mobx";
import { COUNT_OF_THEME, COUNT_OF_SWEATHER } from "../utils/constant";
import { randInt } from "../utils/functions";
import greenTheme from "../theme/green";
import blackTheme from "../theme/black";
import purpleTheme from "../theme/purple";
import greenThemeGoButton from "../asset/green-theme-go-button.svg";
import yelloThemeGoButton from "../asset/yellow-theme-go-button.svg";
import blackThemeGoButton from "../asset/black-theme-go-button.svg";

export default class ColorStore {
  @observable themeCode = parseInt(localStorage.getItem("themeCode"));
  @observable sweaterCode = randInt(1, COUNT_OF_SWEATHER);
  @observable isJump = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    if (!this.themeCode) {
      const randCode = randInt(1, COUNT_OF_THEME);
      this.themeCode = randCode;
      localStorage.setItem("themeCode", randCode);
    }
  }

  updateThemeCode = action(() => {
    this.themeCode = (this.themeCode + 1) % COUNT_OF_THEME;
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
}
