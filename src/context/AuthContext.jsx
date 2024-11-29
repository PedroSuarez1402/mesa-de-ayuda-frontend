/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async() => {
        const token = localStorage.getItem("token");
        if (!token){
            setLoading(false);
            return;
        }
        try {
            const response = await clienteAxios.get("/session-data");
            
            setUser(response.data.user)
        } catch (error) {
            console.error("Error al obtener los datos del usuario de la sesion:", error)
            setUser(null);

        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        
        fetchUserData();
    }, [])
    const login = (userData) => {
        setUser(userData);
        fetchUserData();
    }

    return (
        <AuthContext.Provider value={{user, login, loading}}>
            {children}
        </AuthContext.Provider>
    )
}