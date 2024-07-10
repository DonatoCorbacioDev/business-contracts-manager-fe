import { Manager } from './manager.model';

export interface Contract {
    id: number;
    customer: string;
    contract: string;
    wbs: string;
    projectName: string;
    area: string;
    managerIds?: number[];
    managers?: Manager[]; 
  }
  