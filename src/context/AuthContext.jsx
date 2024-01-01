import React, { createContext } from 'react'
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';



 export const AuthContext =createContext();
//  Bu context, uygulamanız boyunca kullanıcı kimlik doğrulama işlemlerini yönetmek için kullanılacak.

const AuthContextProvider= ({children}) => {
  // Bu bileşen, oluşturduğumuz AuthContext'i sağlar ve içinde kullanılacak diğer bileşenlere bu context'i iletebilir.

    const createUser = async(email,password)=>{
      // yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
        try {
         let userCredential =   await createUserWithEmailAndPassword(auth, email, password); 
         console.log(userCredential);
        } catch (error) {
           console.log(error.message); 
        }
    }
   const signIn =async(email,password)=>{
    try {
        await  signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error.message);
    }
   }


  const values={createUser ,signIn}
  // Bu nesne, AuthContext'in değerine atanacak ve context içinde kullanılabilir.
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;