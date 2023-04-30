import React from "react";
import {useEffect, useState} from "react";
import {Box, Typography, Button, TextField, Grid, Paper, Container} from "@mui/material";
import instance from "../api/createApi";
import ControlledAccordions from "./accordion/ControlledAccordions";



const Profile = () => {
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await instance.get("auth/me");
                setUserId(response.data.id);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    

    return (
        <Container maxWidth={"lg"}>
        <Box bgcolor="#f5f5f5">
            <Typography variant="h4" gutterBottom>
                Личный кабинет
            </Typography>
            <ControlledAccordions 
                firstName={firstName}
                lastName={lastName}
                email={email}
                userId={userId}
            />
        </Box>
        </Container>
    );
};

export default Profile;
