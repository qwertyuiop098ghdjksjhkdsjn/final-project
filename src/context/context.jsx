import { createContext, useState } from "react";

//context хранит данные о пользователях 


export const UserContext = createContext ({token: localStorage.getItem("token"), user: null}); //функция, которая создает контекст и 
                                                                            //присваивает ему начальное значение

function UserContextProvider ({children}) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{token, setToken, user, setUser}}>{children}</UserContext.Provider>
    )
}

export default UserContextProvider;
                                                                        