import React from 'react';

export function Alert({ message, color }) {
    return (
        <p className='alert react-components' style={{ color: color }}><strong>{message}</strong></p>
    );
}
