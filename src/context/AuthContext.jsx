import React, { createContext } from 'react'
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
import { navigate, useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';




 export const AuthContext =createContext();
//  Bu context, uygulamanız boyunca kullanıcı kimlik doğrulama işlemlerini yönetmek için kullanılacak.

const AuthContextProvider= ({children}) => {
  // Bu bileşen, oluşturduğumuz AuthContext'i sağlar ve içinde kullanılacak diğer bileşenlere bu context'i iletebilir.
    let navigate = useNavigate();
    const createUser = async(email,password)=>{
      // yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
        try {
         let userCredential =   await createUserWithEmailAndPassword(auth, email, password); 
         console.log(userCredential);
         navigate("/");
         toastSuccessNotify("Registered successully!")
        } catch (error) {
           toastErrorNotify(error.message); 
        }
    };
   const signIn =async(email,password)=>{
    try {
     let userCredential =   await  signInWithEmailAndPassword(auth, email, password);
     console.log(userCredential);
     navigate("");
     toastSuccessNotify("Logged in successfully!")
    } catch (error) {
      toastErrorNotify(error.message);
    }
   };
   


  const values={createUser ,signIn}
  // Bu nesne, AuthContext'in değerine atanacak ve context içinde kullanılabilir.
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider; 