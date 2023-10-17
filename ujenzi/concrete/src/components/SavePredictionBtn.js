import React from 'react';

// Save Prediction button that brings up save form
function SavePredictionBtn({ handleInitialSave }) {
    return (
        <button onClick={handleInitialSave} className='btn btn-primary react-components'>Save Prediction</button>
    );
}

export default SavePredictionBtn;
