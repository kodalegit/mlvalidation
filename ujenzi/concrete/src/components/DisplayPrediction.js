import React from 'react';

export function DisplayPrediction({ strength }) {
    return (
        <p className='react-components' style={{ marginTop: '0.5rem' }}><strong>Predicted Compressive Strength: </strong>{strength} MPa</p>
    );
}
