import jwtDecode from "jwt-decode";

import { refreshToken } from "../actions/bucketlistsActions";


export function shouldRefreshToken(token) {
  // refresh token if it has less than two minutes to expire
  const threshold = 297;
  const timeToExpire = jwtDecode(token).exp;
  const now = Math.floor(new Date().getTime() / 1000);

  if (timeToExpire - now < threshold) {
    console.log('hey')
    return true;    
  }
  return false;
}