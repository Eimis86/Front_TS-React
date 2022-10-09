import React from "react";
import { createContext, useState } from "react";

const AuthContext = createContext({});

type props = {
    children:any,
    auth?: {},
    setAuth?: React.Dispatch<React.SetStateAction<{}>>
};

export const AuthProvider:React.FC<props> = ( {children} ) => {
    const [auth, setAuth] = useState<{}>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;