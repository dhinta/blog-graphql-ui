import { HttpResponse } from './response';

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface AuthenticationResponse extends HttpResponse {
  token: string;
}
