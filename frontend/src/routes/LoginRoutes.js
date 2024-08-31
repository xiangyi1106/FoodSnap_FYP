import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/login';

export default function LoginRoutes() {
  const { user } = useSelector((state)=>({...state}));
  return user ? <Outlet /> : <Login/>;
}
