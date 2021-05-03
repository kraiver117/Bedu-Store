import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ProductCard } from '../ProductCard/ProductCard';
import products from '../../utils/MockData';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardsCarousel.scss';

export const CardsCarousel = ({ title }) => {
    const { width } = useWindowDimensions();

    const settings = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        centerPadding: (width > 700 ? '230px' : width > 500 ? '180px' : width > 400 ? '280px' : width < 281 ? '100px' : '200px'),
        slidesToShow: (width > 500 ? 2 : 1),
        slidesToScroll: 1
    }
    
    return (
        <Container className='carousel-container my-5'>
                {title  && <h3 className="text-center">{ title }</h3>}
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

CardsCarousel.propTypes = {
    title: PropTypes.string
}

CardsCarousel.defaultProps = {
    title: ''
}