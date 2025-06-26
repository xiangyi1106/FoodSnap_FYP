import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/login';
import { getUserSelector } from '../helpers/selectors';

export default function LoginRoutes() {
  // const { user } = useSelector((state)=>({...state}));
  const user = useSelector(getUserSelector);
  return user ? <Outlet /> : <Login/>;
}
