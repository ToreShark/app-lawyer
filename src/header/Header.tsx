import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Button,
    useMediaQuery,
    useTheme,
    Typography,
    Drawer,
    Modal,
    Box
} from "@mui/material";
import GavelIcon from '@mui/icons-material/Gavel';
import {useAtom} from "jotai";
import {authAtom, redirectPathAtom} from "../atoms/AuthAtoms.";
import {useLogout} from "../utils/Auth";
import React, {createContext, ReactNode, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {SendPhone} from "../services/SendPhone";
import {SendCode} from "../services/SendCode";
import {useNavigate} from "react-router-dom";
import CustomModal from "../screenPages/modal/CustomModal";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawyer from "./Drawyer";

interface AuthLayoutProps {
    children?: ReactNode;
}

interface AuthLayoutContextType {
    handleLogin: (event?: React.MouseEvent<HTMLButtonElement>, redirectPath?: string) => void;
};
const AuthLayoutContext = createContext<AuthLayoutContextType | null>(null);

export const useAuthLayoutContext = () => {
    const context = useContext(AuthLayoutContext);
    if (!context) {
        throw new Error("useAuthLayoutContext must be used within an AuthLayoutProvider");
    }
    return context;
};

function Header({children}: AuthLayoutProps) {
    const modalContentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 3,
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [auth] = useAtom(authAtom);
    const logout = useLogout();
    const navigate = useNavigate();
    const [redirectPath, setRedirectPath] = useAtom(redirectPathAtom);

    const handleLogin = (event?: React.MouseEvent<HTMLButtonElement>, redirectPath?: string) => {
        console.log("handleLogin");
        event?.preventDefault();
        if (redirectPath) {
            setRedirectPath(redirectPath);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCodeSent = () => {
        setIsCodeSent(true);
    };

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        setIsCodeSent(false);
        if (redirectPath) {
            navigate(redirectPath);
            setRedirectPath('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('lastTimeOtp');
        localStorage.removeItem('phoneLocal');
        localStorage.removeItem('redirectPath');
        logout();
    };

    React.useEffect(() => {
        console.log("isModalOpen changed:", isModalOpen);
    }, [isModalOpen]);

    return (
        <AuthLayoutContext.Provider value={{handleLogin}}>

            <>
                <AppBar sx={{background: "#063397"}}>
                    <Toolbar sx={{width: "100%", maxWidth: "lg", margin: "0 auto"}}>
                        <GavelIcon/>
                        {
                            isMatch ? (
                                <>
                                    {/*<Typography> Главная </Typography>*/}
                                    <Drawyer color={"default"} handleLogin={handleLogin} isAuthenticated={auth.isAuthenticated}/>
                                </>
                            ) : (
                                <>
                                    <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)}
                                          indicatorColor="secondary">
                                        <Tab label="Главная" component={Link} to="/"/>
                                        <Tab label="О нас" component={Link} to="/about"/>
                                        <Tab label="Услуги" component={Link} to="/services"/>
                                        <Tab label="Контакты" component={Link} to="/contacts"/>
                                        <Tab label="Жалобы на бездействие ЧСИ" component={Link} to="/complaints"/>
                                    </Tabs>
                                    {auth.isAuthenticated ? (
                                        <Button
                                            sx={{marginLeft: "auto", marginRight: 2}}
                                            variant="text"
                                            startIcon={<AccountCircle/>}
                                            onClick={() => navigate("/profile")}
                                        >
                                            Мой кабинет
                                        </Button>
                                    ) : null}
                                    {auth.isAuthenticated ? (
                                        <Button
                                            sx={{marginLeft: "auto"}}
                                            variant="contained"
                                            onClick={handleLogout}
                                        >
                                            {" "}
                                            Выйти{" "}
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{marginLeft: "auto"}}
                                            variant={"contained"}
                                            onClick={(event) => handleLogin(event)}
                                            // component={Link}
                                            // to="/signup"
                                        >
                                            {" "}
                                            Войти{" "}
                                        </Button>
                                    )}
                                </>
                            )
                        }
                        <CustomModal open={isModalOpen} handleClose={handleCloseModal}>
                            {!isCodeSent ? (
                                <SendPhone onCodeSent={handleCodeSent}/>
                            ) : (
                                <SendCode onLoginSuccess={handleLoginSuccess}/>
                            )}
                        </CustomModal>
                    </Toolbar>
                </AppBar>
                {children}
            </>
        </AuthLayoutContext.Provider>
    );
}

export default Header;
