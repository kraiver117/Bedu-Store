import React from 'react';
import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
import { MainCarousel } from '../../components/MainCarousel/MainCarousel';
import { SocialMedia } from '../../components/SocialMedia/SocialMedia';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export const Home = () => {

    const { width } = useWindowDimensions();

    return (
        <>
            { width >= 800 && <MainCarousel /> }
            <CardsCarousel title='Productos más comprados' />
            <SocialMedia />
            <CardsCarousel title='Nuestros Productos' />
        </>
    )
}
