import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Banner1 from '../../assets/images/Banner1.png';
import Banner2 from '../../assets/images/Banner2.png';
import Banner3 from '../../assets/images/Banner3.png';

export const MainCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner1}
                    alt="First banner"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner2}
                    alt="Second banner"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner3}
                    alt="Third banner"
                />
            </Carousel.Item>
        </Carousel>
    )
}
