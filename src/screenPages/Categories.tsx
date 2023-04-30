import { Box, Typography, IconButton, styled, Card } from "@mui/material";
import { Link } from "react-router-dom";
import BalanceIcon from "@mui/icons-material/Balance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { CategoryWithLink} from "./interface/CategoryWithLink";
import {useCategories} from "./hooks/useCategories";


const iconMap = {
    "Уголовное делоIcon": <BalanceIcon />,
    "Гражданское делоIcon": <BusinessCenterIcon />,
    "Административное делоIcon": <DirectionsCarFilledIcon />,
};

const ResponsiveGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: theme.spacing(3),
    alignItems: "start",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
        gridTemplateColumns: "repeat(1, minmax(200px, 1fr))",
    },
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
    },
    [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
    },
}));

function CategoriesGrid() {
    const { categories, isLoading, isError, error } = useCategories();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        const errorMessage =
            error instanceof Error ? error.message : "An error occurred";
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin="auto"
            padding={3}
            bgcolor="#f5f5f5"
            sx={{
                "@media (max-width: 1023px)": {
                    padding: 0,
                },
            }}
        >
            <ResponsiveGrid>
                {categories?.map((category: CategoryWithLink) => {
                    return (
                        <Card
                            sx={{
                                maxWidth: "100%",
                                p: 2,
                                mt: 2,
                                mb: 2,
                                height: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "start",
                                "@media (max-width: 450px)": {
                                    height: "auto",
                                    justifyContent: "flex-start"
                                },
                            }}
                            key={category.id}
                        >
                            <Box display="flex" alignItems="center">
                                <Link to={category.link} aria-label={category.label}>
                                    {iconMap[category.icon as keyof typeof iconMap]}
                                </Link>
                                <Typography ml={1} variant={"h6"}>{category.name}</Typography>
                            </Box>
                            <Typography textAlign="left" alignItems="start">{category.description}</Typography>
                        </Card>
                    );
                })}
            </ResponsiveGrid>
        </Box>
    );
}

export default CategoriesGrid;
