import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NotLoginRoutes() {
  const { user } = useSelector((state)=>({...state}));
  return user ? <Navigate to="/"></Navigate>: <Outlet /> ;
}
