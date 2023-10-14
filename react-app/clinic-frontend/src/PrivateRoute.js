import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (role !== null) {
      setIsLoading(false);
    }
  }, [role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allowedRoles = ['doctor', 'patient', 'admin'];
  if (role && allowedRoles.includes(role)) {
    console.log("in private route");
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
