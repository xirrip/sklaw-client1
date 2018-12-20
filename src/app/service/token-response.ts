import {User} from '../model/user';

export class TokenResponse {
  username: string;
  email: string;
  access_token: string;
  grants: string;
  expires_in: number;
}
