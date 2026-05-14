import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { emailService } from "@/lib/emailService";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  loginAsAdmin: (user: string, pass: string) => boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("techzone_admin") === "true";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsAdmin = (u: string, p: string) => {
    if (u === "techzone" && p === "tech") {
      setIsAdmin(true);
      localStorage.setItem("techzone_admin", "true");
      return true;
    }
    return false;
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userName = userCredential.user.displayName || email.split("@")[0];
      
      // Send login confirmation email
      await emailService.sendLoginEmail(userName, email);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signupUser = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send welcome email
      await emailService.sendLoginEmail(name, email);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      localStorage.removeItem("techzone_admin");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout, loginAsAdmin, loginUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
