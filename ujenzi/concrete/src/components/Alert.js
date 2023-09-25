import React from 'react';

export function Alert({ message }){
    return (
        <p className='alert'><strong>{message}</strong></p>
    );
}
