
import {
    contextType
} from "@/pages/_app";
import { createContext } from "react";

export const contextDefaultValue = {
    isAuth: false,
    token: '',
    setAuth: Function,
    setToken: Function
}

const AuthContext = createContext<contextType>(contextDefaultValue);

export default AuthContext;