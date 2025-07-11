// stores/homeStore.js
import {makeAutoObservable} from 'mobx';

class ClientStore {
  caseWorker = []
  employeeAttorney = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCaseWorkerList(list) {
    console.log('store list::', list);
    
    this.caseWorker = Array.isArray(list) ? list : [];
  }

  setAttorneyList(list) {
    console.log('store list::', list);
    
    this.employeeAttorney = Array.isArray(list) ? list : [];
  }
}

export default ClientStore;
