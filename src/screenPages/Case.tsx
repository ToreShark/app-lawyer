import {SubcategoryCard} from "../CardGrid/SubcategoryCard";
import {useParams} from "react-router-dom";
import {Box, Container} from "@mui/material";
import React from "react";
import Footer from "../footer/Footer";
import {useSubcategories} from "./hooks/useSubcategories";

export const Case = () => {
    const params = useParams();
    const slug = params.slug || "";
    const { subcategories, isLoading, isError, error } = useSubcategories(slug);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        const errorMessage =
            error instanceof Error ? error.message : "An error occurred";
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ background: "#f5f5f5" }}>
            <Box
                display="flex"
                flexDirection={"column"}
                alignItems="flex-start"
                justifyContent={"flex-start"}
                margin={"auto"}
                marginTop={8}
                bgcolor="#f5f5f5"
                padding={3}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1rem",
                    "@media (max-width: 960px)": {
                        padding: 0,
                    },
                }}
            >
                {subcategories &&
                    subcategories.map((subcategory) => (
                        <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
                    ))}
            </Box>
            <Footer />
        </Container>
    );
};