import React, { useState, useEffect } from 'react';
import { useLogin} from '../utils/Auth';
import { useAtom } from 'jotai';
import {phoneLocalAtom, lastTimeOtpAtom, isSignInAtom, isSignUpAtom, redirectPathAtom} from '../atoms/AuthAtoms.';
import {useNavigate} from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MuiOtpInput } from "mui-one-time-password-input";

interface SendCodeProps {
    onLoginSuccess: () => void;
}
export function SendCode({ onLoginSuccess }: SendCodeProps) {
    const [phone, setPhone] = useAtom(phoneLocalAtom);
    const [lastTimeOtp, setLastTimeOtp] = useAtom(lastTimeOtpAtom);
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const login = useLogin();
    const [isSignIn, setIsSignIn] = useAtom(isSignInAtom);
    const [isSignUp, setIsSignUp] = useAtom(isSignUpAtom);
    const [redirectPath, setRedirectPath] = useAtom(redirectPathAtom);

    const [seconds, setSeconds] = useState(getDiffTimeLocalStorage());

    function getDiffTimeLocalStorage() {
        const now = Date.now();
        const diff = now - (lastTimeOtp || 0);
        const diffSeconds = Math.floor(diff / 1000);
        return diffSeconds < 60 ? 60 - diffSeconds : 0;
    }

    useEffect(() => {
        setSeconds(getDiffTimeLocalStorage());
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [lastTimeOtp]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(phone, parseInt(code)).then(() => {
            onLoginSuccess();
            // navigate(redirectPath);
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    maxWidth={300}
                    alignItems="center"
                    justifyContent={'center'}
                    margin={'auto'}
                    marginTop={0}
                    padding={2}
                    borderRadius={5}
                    sx={{
                        '@media (max-width: 600px)': {
                            maxWidth: '90%',
                        },
                    }}
                >
                    <Typography>Введите полученный код</Typography>
                    {seconds > 0 ? (
                        <Typography>{seconds}</Typography>
                    ) : (
                        <Button type="submit" onClick={() => navigate('/signup')}>
                            Повторить
                        </Button>
                    )}

                    <MuiOtpInput
                        value={code}
                        onChange={(value) => {
                            if (/^\d*$/.test(value)) {
                                setCode(value);
                            } else {
                                alert('Вводите только цифры');
                            }
                        }}
                        sx={{
                            input: {
                                width: '2.5rem',
                                height: '3rem',
                                fontSize: '1.5rem',
                                '@media (max-width: 600px)': {
                                    width: '2rem',
                                    height: '2.5rem',
                                    fontSize: '1.2rem',
                                },
                            },
                            inputContainer: {
                                justifyContent: 'space-around',
                                width: '100%',
                                '@media (max-width: 600px)': {
                                    justifyContent: 'space-between',
                                },
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        sx={{ marginTop: 3, borderRadius: 3 }}
                        variant="contained"
                        color="warning"
                    >
                        Войти
                    </Button>
                </Box>
            </form>
        </div>
    );
}