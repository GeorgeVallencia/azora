import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const {data} = await axios.get('http://localhost:4000/profile', {withCredentials:true});
        setUser(data);
      } catch(error) {
        console.error("Error fetching user data:", error);
      }
    }
    if(!user) {
      fetchUser();
    }
  }, [user]);

  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}