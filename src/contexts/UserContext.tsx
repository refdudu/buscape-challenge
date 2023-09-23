import { api } from "@/utils/api";
import {
    GoogleAuthProvider,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    signInWithRedirect,
    Auth,
    AuthProvider
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

    function singInMethod(_auth: Auth, provider: AuthProvider) {
        const screenWidth = window.innerWidth;
        const isMobileDevice = screenWidth < 768;
        if (isMobileDevice) return signInWithRedirect(_auth, provider);

        return signInWithPopup(_auth, provider);
    }

    async function signIn() {
        const auth = getAuth();
        const googleProvider = new GoogleAuthProvider();
        try {
            const { user } = await singInMethod(auth, googleProvider);

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
