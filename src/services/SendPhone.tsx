import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {useSendVerificationCode} from "../utils/Auth";
import {useAtom} from "jotai";
import {lastTimeOtpAtom, phoneLocalAtom} from "../atoms/AuthAtoms.";

interface SendPhoneProps {
    onCodeSent: () => void;
}
export function SendPhone({ onCodeSent }: SendPhoneProps) {
    const [phoneLocal, setPhoneLocal] = useAtom(phoneLocalAtom);
    const [lastTimeOtp, setLastTimeOtp] = useAtom(lastTimeOtpAtom);
    const navigate = useNavigate();
    const sendVerificationCode = useSendVerificationCode();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const phoneRegex = /^[0-9]+$/;
        if (phoneLocal.trim().length === 0) {
            alert("Номер телефона не должен быть пустым.");
            return;
        };
        if (/[A-Za-zА-Яа-яЁё]/.test(phoneLocal)) {
            alert("Некорректный номер телефона: должны быть только цифры.");
            return;
        }
        if (phoneLocal.length !== 11) {
            alert("Некорректный номер телефона: должно быть 11 цифр.");
            return;
        };
        sendVerificationCode(phoneLocal)
            .then(() => {
                setPhoneLocal(phoneLocal);
                setLastTimeOtp(Date.now());
                onCodeSent();
            })
            .catch((error) => {
                console.error('Ошибка при отправке кода верификации:', error);
            });
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={300}
                    alignItems="center"
                    justifyContent={"center"}
                    margin={"auto"}
                    marginTop={0}
                    padding={2}
                    borderRadius={5}
                    sx={{
                        '@media (max-width: 600px)': {
                            maxWidth: '100%',
                        },
                    }}
                >
                    <Typography>Регистрация/вход</Typography>
                    <TextField
                        name="phone"
                        value={phoneLocal}
                        onChange={(e) => setPhoneLocal(e.target.value)}
                        margin="normal"
                        type={"tel"}
                        label="Телефонный номер"
                        id="phone"
                        placeholder="8707777777"
                        helperText="Введите номер телефона"
                        sx={{
                            width: '100%',
                            '@media (max-width: 600px)': {
                                width: '100%',
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        // onClick={() => setIsSignUp(!isSignUp)}
                        sx={{marginTop: 3, borderRadius: 3}}
                        variant="contained"
                        color="warning"
                    >
                        ОТПРАВИТЬ СМС
                    </Button>
                </Box>
            </form>
        </div>
    )
}