export interface User {
  email: string | undefined;
  password: string | undefined;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  "Phone number": string;
}

export interface ErrorLoginResponse {
  errCode: string;
  resCode: string;
  resMsg: string;
}

export interface Result {
  identity: string;
  redirectUrl: string
}

export interface LoginResponse {
  resCode: string;
  resMsg: string;
  result: Result
}

export interface AuthHeaders {
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number; // in seconds
  token_type: string; // token type should be Bearer
}


export interface SignupResponse {
  resCode: string;
  resMsg: string;
  result: Result
}


export interface signinRequest{
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface signinResponse{
    token: string;
    user: signinRequest
}

export interface signupRequest{
    email: string;
    password: string;
}

export interface signupResponse{
    token: string;
    user: signupRequest
}