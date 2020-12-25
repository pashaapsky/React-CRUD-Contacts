import React, {useCallback, useEffect, useState} from 'react';
import axios from "../axios";

function useAuth(props) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = useCallback(async (values) => {
        try {
            const res = await axios.post('/login', {"email": values.email, "password": values.password});

            if (res) {
                localStorage.setItem('authData', JSON.stringify({"user": {'email' : values.email}, "token": res.data.accessToken}));

                setUser({"email" : values.email});
                setToken(res.data.accessToken);
            }
        } catch (e) {
            console.error(e.message)
        }
    }, []);

    const register = useCallback(async (values) => {
        try {
            const res = await axios.post('/register', {"email": values.email, "password": values.password});

            if (res) {
                localStorage.setItem('authData', JSON.stringify({"user": {"email": values.email}, "token": res.data.accessToken}));

                setUser({"email": values.email});
                setToken(res.data.accessToken);
            }
        } catch (e) {
            console.error(e.message)
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authData');
        setUser(null);
        setToken(null);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('authData'));

        if (data) {
            setUser(data.user);
            setToken(data.token);
        }
    }, []);


    return {user, token, setToken, setUser, login, register, logout}
}

export default useAuth;