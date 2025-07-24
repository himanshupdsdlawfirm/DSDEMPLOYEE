import AuthStore from "./authStore";
import ClientStore from "./clientStore";
import HomeStore from "./homeStore";
import UscisStore from "./uscisStore";

class RootStore {
  constructor() {
    this.authStore = new AuthStore();
    this.homeStore = new HomeStore();
    this.clientStore = new ClientStore();
    this.uscisStore = new UscisStore();
  }
}

const rootStore = new RootStore();

export default rootStore;