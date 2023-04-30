import React, { useEffect, useState, MouseEventHandler } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import fetchCarouselItems from './fetchCarouselItems';

interface CarouselItem {
    imageUrl: string;
    title: string;
    description: string;
}

const Arrow = styled('div')({
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    color: '#fff',
});

const TextOverlay = styled(Box)({
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
});

function ImageCarousel() {
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    useEffect(() => {
        fetchCarouselItems().then((items) => setCarouselItems(items));
    }, []);

    return (
        <Carousel
            NavButton={({ onClick, className, style, next }) => {
                const isNext = next ? 'right' : 'left';
                return (
                    <Arrow
                        onClick={onClick as MouseEventHandler<HTMLDivElement>}
                        className={`${className}`}
                        style={{ ...style, [isNext]: 10 }}
                    >
                        {next ? '>' : '<'}
                    </Arrow>
                );
            }}
            indicators={false}
        >
            {carouselItems.map((item, index) => (
                <Paper key={index} style={{ position: 'relative' }}>
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            maxHeight: '400px',
                        }}
                    />
                    <TextOverlay>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.description}</Typography>
                    </TextOverlay>
                </Paper>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
