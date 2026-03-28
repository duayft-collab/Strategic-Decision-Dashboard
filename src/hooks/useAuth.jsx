// Duay Global Trade | useAuth.js | K02 | v1.0 | 2026-03-28
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const login = async (email, password) => {
    if (lockedUntil && Date.now() < lockedUntil) {
      const kalan = Math.ceil((lockedUntil - Date.now()) / 60000);
      throw new Error(`Cok fazla hatali giris. ${kalan} dakika bekleyin.`);
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAttempts(0);
    } catch (err) {
      const yeni = attempts + 1;
      setAttempts(yeni);
      if (yeni >= 5) { setLockedUntil(Date.now() + 15 * 60 * 1000); setAttempts(0); }
      throw err;
    }
  };

  const logout = () => signOut(auth);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
