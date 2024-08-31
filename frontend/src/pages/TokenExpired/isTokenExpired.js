import jwtDecode from 'jwt-decode';
import { getCookies } from '../../functions/getCookies';

export const isTokenExpired = () => {
  const token = getCookies('token'); // Assuming the cookie name is 'token'
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};
