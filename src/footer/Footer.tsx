import { Box, Button, Grid, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
            <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                            Компания
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            О нас
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Наши услуги
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Контакты
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                            Полезные ресурсы
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Блог
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            FAQ
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Партнеры
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{alignItems: "flex-start"}}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                            Подписка на новости
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Получайте наши новости и обновления прямо в ваш почтовый ящик
                        </Typography>
                        <input type="email" placeholder="Введите ваш email" style={{ height: "40px", marginRight: "8px", borderRadius: 0 }} />
                        <Button variant="contained" sx={{ height: "40px", borderRadius: 0 }}>
                            Подписаться
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: "1px solid white", mt: 3, pt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        © 2023 Сайт адвоката Мухтарова Торехана. Все права защищены.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Копирование материалов запрещено.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook sx={{ mr: 2, color: "white" }}  />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram sx={{ mr: 2, color: "white" }}  />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter sx={{ color: 'white' }} />
                        </a>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
