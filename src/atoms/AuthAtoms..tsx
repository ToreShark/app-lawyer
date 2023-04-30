import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
export const authAtom = atom({
    isAuthenticated: localStorage.getItem('authToken') !== null,
    authToken: localStorage.getItem('authToken') || '',
})

export const phoneLocalAtom = atomWithStorage<string>('phoneLocal', '');
export const lastTimeOtpAtom = atomWithStorage<number | undefined>('lastTimeOtp', undefined);
export const isSignInAtom = atomWithStorage<boolean>("isSignIn", false);
export const isSignUpAtom = atomWithStorage<boolean>("isSignUp", false);
export const redirectPathAtom = atomWithStorage<string>("redirectPath", "/test");