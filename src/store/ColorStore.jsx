import { observable, action } from "mobx";
import { COUNT_OF_THEME, COUNT_OF_SWEATHER } from "../utils/constant";
import { randInt } from "../utils/functions";
import greenTheme from "../theme/green";
import blackTheme from "../theme/black";
import purpleTheme from "../theme/purple";

export default class ColorStore {
  @observable themeCode = randInt(1, COUNT_OF_THEME);
  @observable sweaterCode = randInt(1, COUNT_OF_SWEATHER);
  @observable isJump = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  updateThemeCode = action(() => {
    this.themeCode = (this.themeCode + 1) % COUNT_OF_THEME;
  });

  getTheme = action(() => {
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
  });
}
