import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { fetchData } from "../utils/rapidapi";
import { useContext } from "react";
//Context API is used to pass the data across the component without passing the props manually
export const AuthContext=createContext()

export default function AuthProvider({children}){
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState([]);
    const [value,setValue]=useState("New");

    useEffect(()=>{fetchAllData(value)},[value])

    const fetchAllData=(query)=>{
        setLoading(true)
        fetchData(`search/?q=${query}`).then(({contents})=>{
            setData(contents)
            setLoading(false)
        })
    }
    return(
        <AuthContext.Provider value={{loading,data,value,setValue}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)