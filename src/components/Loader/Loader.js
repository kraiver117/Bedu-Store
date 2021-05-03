import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

export const Loader = ({ position, marginY }) => {
    return (
        <Spinner
            animation="border"
            role='status'
            style={{
                display: 'flex',
                width: '120px',
                height: '120px',
                color: '#FF5F29',
                position: position,
                margin: 'auto',
                marginTop: marginY,
                marginBottom: marginY,
                top: '-15%',
                bottom: '0',
                right: '0',
                left: '0',
                opacity: '0.5'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
};

Loader.propTypes = {
    position: PropTypes.string,
    marginY: PropTypes.string
}

Loader.defaultProps = {
    position: 'absolute',
    marginY: 'auto'
}
