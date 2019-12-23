import greenTheme from "../theme/green";
import blackTheme from "../theme/black";
import purpleTheme from "../theme/purple";

export function getTheme(themeCode) {
  switch (themeCode) {
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
