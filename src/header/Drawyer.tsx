import React, {useState} from 'react';
import {Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {useLogout} from "../utils/Auth";

interface DrawyerProps {
    color?: string;
    handleLogin?: (event?: React.MouseEvent<HTMLButtonElement>, redirectPath?: string) => void;
    isAuthenticated?: boolean;
}

function Drawyer({color = "inherit", handleLogin, isAuthenticated}: DrawyerProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useLogout();

    const handleNavigation = (path: string) => {
        navigate(path);
        setOpen(false);
    };
    
    const handleLogout = () => {
        localStorage.removeItem("lastTimeOtp");
        localStorage.removeItem("phoneLocal");
        localStorage.removeItem("redirectPath");
        logout();
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <List>
                    <ListItemButton onClick={() => handleNavigation('/')}>
                        <ListItemText>Главная</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation('/about')}>
                        <ListItemText>О нас</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation('/services')}>
                        <ListItemText>Услуги</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation('/contacts')}>
                        <ListItemText>Контакты</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation('/complaints')}>
                        <ListItemText>Жалобы на бездействие ЧСИ</ListItemText>
                    </ListItemButton>
                    {isAuthenticated ? (
                        <>
                            <ListItemButton onClick={() => handleNavigation("/profile")}>
                                <ListItemText>Мой кабинет</ListItemText>
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                            >
                                <ListItemIcon>
                                    <ListItemText>Выйти</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        </>
                    ) : (
                        <ListItemButton
                            onClick={() => {
                                setOpen(false);
                                handleLogin?.();
                            }}
                        >
                            <ListItemIcon>
                                <ListItemText>Войти</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpen(!open)} sx={{marginLeft: "auto", marginRight: 2}}>
                <MenuIcon/>
            </IconButton>
        </React.Fragment>
    );
}

export default Drawyer;