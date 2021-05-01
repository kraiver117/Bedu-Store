import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export const Message = ({variant, textPosition, children}) => {
    return (
        <Alert className={`text-${textPosition}`} variant={variant}>
            {children}
        </Alert>
    )
};

Message.propTypes = {
    variant: PropTypes.string,
    children : PropTypes.node
}

Message.defaultProps = {
    textPosition: 'center',
    variant: 'info'
}
