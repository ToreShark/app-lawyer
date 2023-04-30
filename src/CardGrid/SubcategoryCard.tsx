import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Subcategory} from "../screenPages/interface/Subcategory";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {redirectPathAtom} from "../atoms/AuthAtoms.";
import { authAtom } from "../atoms/AuthAtoms.";
import {useAuthLayoutContext} from "../header/Header";

type SubcategoryProps = {
    subcategory: Subcategory;
};

export const SubcategoryCard = ({ subcategory }: SubcategoryProps) => {
    const navigate = useNavigate();
    const { handleLogin } = useAuthLayoutContext();
    const [redirectPath, setRedirectPath] = useAtom(redirectPathAtom);
    const [{ isAuthenticated }] = useAtom(authAtom);
    return (
        <Card
            sx={{
                maxWidth: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardActionArea>
                {subcategory.image && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={subcategory.image}
                        alt={subcategory.name}
                    />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {subcategory.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subcategory.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {!isAuthenticated && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={(event) => {
                            handleLogin(event, `/subcategory/${subcategory.slug}`);
                        }}
                    >
                        Войти
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            navigate(`/subcategory/${subcategory.slug}`);
                        }}
                    >
                        Открыть
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};