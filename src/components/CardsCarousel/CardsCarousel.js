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
        centerMode: width > 500 ? true : false,
        dots: true,
        infinite: true,
        centerPadding: '225px',
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    centerPadding: '280px'
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '180px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
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