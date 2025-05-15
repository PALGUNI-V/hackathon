import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        doctors,
    }

    const getDoctors = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;