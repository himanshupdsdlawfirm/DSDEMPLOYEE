// stores/homeStore.js
import {makeAutoObservable} from 'mobx';

class ClientStore {
  caseWorker = []
  employeeAttorney = [];
  caseType = []

  constructor() {
    makeAutoObservable(this);
  }

  setCaseWorkerList(list) {
    console.log('store list::', list);
    
    this.caseWorker = Array.isArray(list) ? list : [];
  }

  setCaseType(list) {
    console.log('case type store list::', list);
    
    this.caseType = Array.isArray(list) ? list : [];
  }

  setAttorneyList(list) {
    console.log('store list::', list);
    
    this.employeeAttorney = Array.isArray(list) ? list : [];
  }
}

export default ClientStore;
