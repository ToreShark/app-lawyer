import axios from 'axios';
import { authAtom} from "../atoms/AuthAtoms.";
import {atom, useAtom} from "jotai";
import instance from '../api/createApi';

export const useLogin = () => {
    const [auth, setAuth] = useAtom(authAtom);

    return async (phone: string, code: number) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const response = await instance.post('/auth/login', {
                    phone,
                    code,
                });

                const { accessToken } = response.data;
                setAuth((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    authToken: accessToken,
                }));
                localStorage.setItem('authToken', accessToken);
                resolve();
            } catch (e) {
                console.log(Error);
                reject(e);
            }
        });
    };
};

export const useSendVerificationCode = () => {
    return async (phone: string) => {
        try {
            await instance.post('/auth/signup', { phone });
        } catch (e) {
            console.error('Ошибка при отправке кода верификации:', e);
            throw e;
        }
    };
};

export const useLogout = () => {
    const [auth, setAuth] = useAtom(authAtom);

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            authToken: '',
        });
        localStorage.removeItem('authToken');
    };

    return logout;
};

export const userAtom = atom({
    firstName: '',
});