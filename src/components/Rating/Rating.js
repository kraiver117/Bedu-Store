import React from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

export const Rating = ({ value, text, color, display }) => {
    return (
        <div className={`rating ${display && `d-${display}`}`}>
            <span>
                <i style={{ color }}
                    className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i style={{ color }}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i style={{ color }}
                    className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i style={{ color }}
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            <span>
                <i style={{ color }}
                    className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                />
            </span>
            { text && <span className='ml-3'>{text && text}</span> }
        </div>
    );
}

Rating.defaultProps = {
    color: '#f8e826',
    text: '',
    display: 'block'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string,
    display: PropTypes.string
}
