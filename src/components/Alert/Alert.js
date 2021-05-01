import React from 'react';
import { Alert } from 'react-bootstrap';

export const Message = ({variant, textPosition, children}) => {
    return (
        <Alert className={`text-${textPosition}`} variant={variant}>
            {children}
        </Alert>
    )
};

Message.defaultProps = {
    textPosition: 'center',
    variant: 'info'
}
