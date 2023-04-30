import React, {useState} from "react";
import {ControlledAccordionsProps} from "../interface/ControlledAccordionsProps";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useFormik} from "formik";
import instance from "../../api/createApi";
import * as yup from "yup";

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required("Имя обязательно для заполнения"),
    lastName: yup
        .string()
        .required("Фамилия обязательно для заполнения"),
    email: yup
        .string()
        .email("Введите корректный email")
        .required("Email обязателен для заполнения"),
});
const ControlledAccordions = ({firstName, lastName, email, userId}: ControlledAccordionsProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (userId) {
                try {
                    const response = await instance.patch(`auth/${userId}`, values);
                    console.log("Response:", response);
                    handleClickOpen();
                    formik.resetForm();
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            } else {
                console.error("User ID is not available");
            }
        },
    });

    const fetchUserData = async () => {
        try {
            const response = await instance.get(`auth/me`);
            const fetchedUserData = response.data;
            setUserData({
                firstName: fetchedUserData.firstName,
                lastName: fetchedUserData.lastName,
                email: fetchedUserData.email,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    React.useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId, instance]);
    

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        Информация о пользователе
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Имя: {userData.firstName} <br />
                        Фамилия: {userData.lastName} <br />
                        Email: {userData.email}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        Документы
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* Отображение списка документов, созданных пользователем */}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        Редактировать профиль
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box p={2}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="Имя"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Фамилия"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <Button type="submit">Сохранить изменения</Button>
                        </form>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Успешно!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Ваши данные были успешно обновлены.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Ок
                            </Button>
                        </DialogActions>
                    </Dialog>
                </AccordionDetails>
            </Accordion>
        </div>)
};

export default ControlledAccordions;