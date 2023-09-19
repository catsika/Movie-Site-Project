import axios, { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import {
  DecodedJwt,
  DisplayUser,
  Jwt,
  LoggedInUser,
} from "../models/AsyncState.interface";
import { NewUser } from "../models/NewUser";
import { OldUser } from "../models/OldUser";

const register = async (newUser: NewUser): Promise<DisplayUser | any> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/register`,
    newUser
  );
  return data;
};

const login = async (
  oldUser: OldUser
): Promise<{ jwt: Jwt; user: LoggedInUser | null } | any> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/login`,
    oldUser
  );
  if (data.token) {
    localStorage.setItem("jwt", JSON.stringify(data));
    const decodedJwt: DecodedJwt = jwt_decode(data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return { jwt: data, user: decodedJwt.user };
  }
  return { jwt: data, user: null, isAuthenticated: false };
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/verify-jwt`,
    { jwt }
  );
  if (data) {
    const jwtExpirationMs = data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false;
};

const authService = {
  register,
  login,
  verifyJwt,
};

export default authService;
