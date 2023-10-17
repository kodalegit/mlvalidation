import React from 'react';

export function DisplayPrediction({ strength }) {
    return (
        <p className='react-components'><strong>Predicted Compressive Strength: </strong>{strength} MPa</p>
    );
}
