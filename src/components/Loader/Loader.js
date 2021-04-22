import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
    return (
        <Spinner
            animation="border"
            style={{
                width: '120px',
                height: '120px',
                color: '#FF5F29',
                position: 'fixed',
                margin: 'auto',
                top: '-35%',
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
