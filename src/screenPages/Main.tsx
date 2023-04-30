import React from "react";
import { Box, Container } from "@mui/material";
import ImageCarousel from "../carousel/ImageCarousel";
import CategoriesGrid from "./Categories";
import Footer from "../footer/Footer";

function Main() {
    return (
        <Container sx={{ background: "#f5f5f5" }} maxWidth={"lg"}>
            <Box marginTop={8}>
                <ImageCarousel />
            </Box>
            <Box>
                <CategoriesGrid />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Container>
    );
}

export default Main;
