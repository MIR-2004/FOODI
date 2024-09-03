import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({children}) => {

  const {user, loading} = useContext(AuthContext);
  const location = useLocation();


  if(loading){
    return(
      <Loading/>
    )
  }
  if(user){
    return children
  }
    
  return (
    <Navigate
    to="/signup"
    state={{ from: location }}
    replace
  />
  )
}

export default PrivateRouter
