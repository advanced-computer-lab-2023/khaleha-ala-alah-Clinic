import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); 
  
    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const res = await axios.post('http://localhost:4000/users/validateToken', {}, {
              headers: {
                authorization: `Bearer ${token}`
              }
            });
            setRole(res.data.role);
          } catch (error) {
            if(error.response.data.error === "User not verified yet"){
              setRole("notVerified");
            }else if(error.response.data.error === "Doctor not approved yet"){
              setRole("notApproved");
            }else{
              setRole("");
            }
          }
        } else {
          setRole("");
        }
      };
      fetchData();
    }, []);
    

  return (
    <AuthContext.Provider value={{ role }}>
      {children}
    </AuthContext.Provider>
  );
};
