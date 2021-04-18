import React from 'react';
import { CardsCarousel } from '../../components/CardsCarousel';
import { MainCarousel } from '../../components/MainCarousel';
import { SocialMedia } from '../../components/SocialMedia';

export const Home = () => {
    return (
        <>
            <MainCarousel />
            <CardsCarousel title='Productos más comprados' />
            <SocialMedia />
            <CardsCarousel title='Nuestros Productos' />
        </>
    )
}
