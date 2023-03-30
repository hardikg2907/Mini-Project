import React, { useContext,useState } from "react";
const MyContext = React.createContext();

const AppProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState(false);

    return <MyContext.Provider value={{loggedIn, setLoggedIn}}>
        {children}
    </MyContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(MyContext)
}

export {MyContext,AppProvider}