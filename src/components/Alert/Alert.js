import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export const Message = ({variant, textPosition, children}) => {
    const [show, setShow] = useState(true);

    return (
        <Alert show={show} className={`text-${textPosition}`} onClose={() => setShow(false)} variant={variant} dismissible>
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
