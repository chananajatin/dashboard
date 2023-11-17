import React, { useCallback, useState } from 'react'
import { UserContext } from './context/UserContext';
import UserDetailsTab from './components/UserDetailsTab';
import AccountCreationTab from './components/AccountCreationTab';



const Display = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);

    }, []);


    return (
        <>
            <UserContext.Provider
                value={{
                    isLoggedIn: isLoggedIn,
                    login: login,
                }}>

                {isLoggedIn && <UserDetailsTab/>}
                {!isLoggedIn && <AccountCreationTab/>}
            </UserContext.Provider>
        </>
    )
}

export default Display