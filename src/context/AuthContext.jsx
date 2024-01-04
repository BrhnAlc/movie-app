import React, { createContext, useState,useEffect } from 'react'
import { auth } from "../auth/firebase";
import { signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword ,signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
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
    
    const createUser = async(email,password,displayName)=>{
      // yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
        try {
         let userCredential =   await createUserWithEmailAndPassword(auth, email, password);
         await updateProfile(auth.currentUser,  {
          // key ve value değerleri aynı ise sadece key değerlerini yazabiliriz
          displayName
        }) 
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
       setCurrentUser(false)
        console.log("logged out");
      }
    });
   }

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //?! Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate("/");
  })
  .catch((error) => {
    console.log(error);
  });
};

  const values={createUser ,signIn,logOut,currentUser,signUpProvider}
  // Bu nesne, AuthContext'in değerine atanacak ve context içinde kullanılabilir.
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider; 