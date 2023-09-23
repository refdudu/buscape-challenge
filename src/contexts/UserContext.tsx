import { api } from "@/utils/api";
import {
    GoogleAuthProvider,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    user: User | null;
    isAuthenticated: boolean;
}
const UserContext = createContext({} as UserContextProps);

interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    async function signIn() {
        const auth = getAuth();
        const googleProvider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, googleProvider);

            setUser(user);
        } catch {}
    }
    async function signOut() {
        try {
            const auth = getAuth();
            await firebaseSignOut(auth);
            setUser(null);
        } catch {}
    }
    async function changeHeader() {
        if (user) {
            const token = await user.getIdToken();
            setIsAuthenticated(true);
            api.defaults.headers.authorization = `Bearer ${token}`;
        } else {
            api.defaults.headers.authorization = ``;
            setIsAuthenticated(false);
        }
    }
    useEffect(() => {
        changeHeader();
    }, [user]);
    return (
        <UserContext.Provider
            value={{ signIn, user, signOut, isAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);
