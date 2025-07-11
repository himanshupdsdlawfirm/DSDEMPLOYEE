import AuthStore from "./authStore";
import ClientStore from "./clientStore";
import HomeStore from "./homeStore";

class RootStore {
  constructor() {
    this.authStore = new AuthStore();
    this.homeStore = new HomeStore();
    this.clientStore = new ClientStore();
  }
}

const rootStore = new RootStore();

export default rootStore;