import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import firebase from './firebase';
import AuthToast from '../components/authToast';
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState('/');

  const handleUser = async rawUser => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = async (email, password) => {
    setLoading(true);
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
          setRedirect('/');
        }
      })
      .catch(err => {
        AuthToast(err.message);
      });
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    return await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
          setRedirect('/');
        }
      })
      .catch(err => {
        AuthToast(err.message);
      });
  };

  const signinWithFacebook = async () => {
    setLoading(true);
    return await firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
          setRedirect('/');
        }
      })
      .catch(err => {
        AuthToast(err.message);
      });
  };

  const signUp = async (email, password) => {
    setLoading(true);
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
          setRedirect('/');
        }
      })
      .catch(err => {
        AuthToast(err.message);
      });
  };

  const signout = async () => {
    return await firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
      .catch(err => {
        AuthToast(err.message);
      });
  };

  const sendPasswordReset = async email => {
    return await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Router.push('/login');
      })
      .catch(err => {
        AuthToast(err.message);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGoogle,
    signinWithFacebook,
    signUp,
    signout,
    sendPasswordReset,
    setRedirect,
  };
}

const formatUser = async user => {
  const decodedToken = await user.getIdTokenResult(true);
  const { token, expirationTime } = decodedToken;
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
    expirationTime,
  };
};
