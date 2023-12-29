import React, { createContext } from 'react'
import { auth } from "../auth/firebase";


 export const AuthContext =createContext();


const AuthContextProvider= ({children}) => {

    const createUser = async(email,password)=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password); 
        } catch (error) {
           console.log(error); 
        }
      
  
    }
  const values={createUser}
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;