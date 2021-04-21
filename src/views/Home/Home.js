import React from 'react';
import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
import { MainCarousel } from '../../components/MainCarousel/MainCarousel';
import { SocialMedia } from '../../components/SocialMedia/SocialMedia';

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
