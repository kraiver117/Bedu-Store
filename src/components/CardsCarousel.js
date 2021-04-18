import React from 'react';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { ProductCard } from './ProductCard';
import products from '../utils/MockData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const CardsCarousel = () => {
    const { width } = useWindowDimensions();

    const settings = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        centerPadding: (width > 700 ? "230px" : width > 500 ? "180px" : width > 400 ? "280px" : width < 281 ? "100px" : "200px"),
        slidesToShow: (width > 500 ? 2 : 1),
        slidesToScroll: 2
    }
    
    return (
        <Container>
                <Slider {...settings}>
                    {
                        products.map( (product, index) => (
                                <ProductCard key={index} product={product} />
                        ))
                    }                 
                </Slider>
        </Container>
    )
}
