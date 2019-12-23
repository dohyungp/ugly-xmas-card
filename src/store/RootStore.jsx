import ColorStore from "./ColorStore";

class RootStore {
  constructor() {
    this.colorStore = new ColorStore(this);
  }
}
const rootStore = new RootStore();
export default rootStore;
