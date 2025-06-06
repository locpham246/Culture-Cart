import {createContext} from "react";

export const Context = createContext()

export const ContextProvider = (props) =>{
    const backendurl = import.meta.env.BACKEND_URL
    const [isLoggedin, setIsloggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    const value={
        backendurl,
        isLoggedin,
        setIsloggedin,
        userData,
        setUserData
    }
    return(
        <Context.Provider value={value}> 
        {props.children}
        </Context.Provider>
    )
}