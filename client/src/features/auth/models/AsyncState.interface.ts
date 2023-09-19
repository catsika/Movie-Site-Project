export interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
export type Jwt = {
  token: string | null;
};

export interface DisplayUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface DecodedJwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: string;
  username: string;
  email: string;
  role: string;
  dateJoined: Date;
}

export interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt | null;
  isAuthenticated?: boolean;
}
