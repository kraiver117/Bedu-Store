import React from 'react';
import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
import { MainCarousel } from '../../components/MainCarousel/MainCarousel';
import { SocialMedia } from '../../components/SocialMedia/SocialMedia';

export const Home = () => {
    return (
        <>
            <MainCarousel />
            <CardsCarousel title='PRODUCTOS MÁS COMPRADOS' />
            <SocialMedia />
            <CardsCarousel title='NUESTROS PRODUCTOS' />
        </>
    )
}
