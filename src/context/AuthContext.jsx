import React, { createContext, useState,useEffect } from 'react'
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helpers/ToastNotify';

import { onAuthStateChanged } from "firebase/auth";


 export const AuthContext =createContext();
//  Bu context, uygulamanız boyunca kullanıcı kimlik doğrulama işlemlerini yönetmek için kullanılacak.

const AuthContextProvider= ({children}) => {
  const [currentUser, setCurrentUser] = useState(false)
  // Bu bileşen, oluşturduğumuz AuthContext'i sağlar ve içinde kullanılacak diğer bileşenlere bu context'i iletebilir.
    let navigate = useNavigate();

    useEffect(() => {
      userObserver();
    
    
    }, [])
    
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
    
   const logOut =()=>{
    signOut(auth)
    toastSuccessNotify("Logged in successfully!")
   }
   
   const userObserver =()=>{
    // Kullanıcının signin  olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email,displayName,photoURL}=user;
        setCurrentUser({email,displayName,photoURL})
        console.log(user);
      } else {
       
        console.log("logged out");
      }
    });
   }
  const values={createUser ,signIn,logOut,currentUser}
  // Bu nesne, AuthContext'in değerine atanacak ve context içinde kullanılabilir.
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider; 