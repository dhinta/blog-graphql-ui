import { HttpResponse } from './response';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthenticationResponse extends HttpResponse {
  token: string;
}
