import React from 'react';

export function DisplayPrediction({ strength }){
    return (
        <p><strong>Predicted Compressive Strength: </strong>{strength}</p>
    );
}
