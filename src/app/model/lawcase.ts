import {LawClient} from './lawclient';

export class LawCase {
  id: number;
  name: string;
  type: string;
  caseId: string;

  description: string;

  mainClientId: number;
  mainClient: LawClient;

}
