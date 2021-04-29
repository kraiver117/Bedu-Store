import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export const Message = ({variant, children}) => {
    return (
        <Alert className="text-center" variant={variant}>
            {children}
        </Alert>
    )
};

Message.propTypes = {
    variant: PropTypes.string,
    children : PropTypes.node
}

Message.defaultProps = {
    variant: 'primary'
}
