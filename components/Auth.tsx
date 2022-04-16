import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Auth as AuthInterface,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import firebaseApp, { firestore } from '../firebase';
import { Button } from 'antd';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

export const AuthContext = createContext<{ user: User; auth: AuthInterface }>({
  user: null,
  auth: null,
});

export function AuthWrapper({ children }: { children: ReactNode }) {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function Auth({
  children,
  noAuthContent = null,
}: {
  children: ReactNode;
  noAuthContent?: ReactNode;
}) {
  const { user } = useContext(AuthContext);

  return <>{user ? children : noAuthContent}</>;
}

export const Greeting = () => {
  const { user, auth } = useContext(AuthContext);

  const doLogin = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result.user) {
      const userDoc = doc(firestore, 'users', result.user.email);
      setDoc(userDoc, {
        lastLogin: Timestamp.fromDate(new Date()),
      });
    }
  };

  if (!user)
    return (
      <div>
        <span>Hello Stranger!</span>
        <Button
          onClick={doLogin}
          type="primary"
          size="small"
          shape="round"
          className="ml-2"
        >
          login
        </Button>
      </div>
    );

  return (
    <div>
      Hello <span className="font-bold text-blue-500">{user.displayName}!</span>
      <Button
        type="dashed"
        shape="round"
        onClick={() => signOut(auth)}
        size="small"
        className="ml-2 text-gray-500"
      >
        Logout
      </Button>
    </div>
  );
};
