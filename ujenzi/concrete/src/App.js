import React from 'react';
import { useState, useEffect } from 'react';


// Save Prediction button that brings up save form
function SavePredictionBtn({ handleInitialSave }) {
    return (
    <button onClick={handleInitialSave}>Save Prediction</button>
    );
}

// Form that is used to save to edit entry and save to database
function SaveForm({ strength, handleCancel, handleSubmit }){
    const currentDate = new Date();
    const currentTime = currentDate.toISOString();
    return (
        <>
        <form>
            <input name='description'></input>
            <input name='strength' defaultValue={strength}></input>
            <input name='time' defaultValue={currentTime}></input>
            <input type='submit' value='Save' onClick={handleSubmit}></input>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        </>
    )
}

function App(){
    const [strength, setStrength] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const displayedResult = document.querySelector('#displayStrength');
    if (displayedResult) {
        const value = displayedResult.getAttribute('data-strength');
        setStrength(value);
    }

    const handleInitialSave = () => {
        setShowButton = false;
        setShowForm = true;
    }

    const handleSubmit = () => {
        // Post to backend database and save
        setShowForm = false;
        setShowButton = true;
    }
    
    const handleCancel = () => {
        setShowForm = false;
        setShowButton = true;
    }

    return (
        <div>
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmit={handleSubmit}/>}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave}/>}
        </div>

    )

}

export default function App(){
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gather form data and submit
        const formData = new FormData(e.target);

        // Make POST request to backend to obtain strength prediction
        const response = await fetch('prediction', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        setPrediction(data.prediction);

    };

    // Obtain csrf token for form submission
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch('csrf')
        .then((response) => response.json())
        .then((data) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                <label htmlFor="cement">Cement: <input type="text" name='cement' id='cement' /></label>
                <label htmlFor="age">Age: <input type="text" name='age' id='age' /></label>
                <label htmlFor="water">Water: <input type="text" name='water' id='water' /></label>
                <label htmlFor="coarseaggregate">Coarse Aggregate: <input type="text" name='coarseaggr' id='coarseaggregate' /></label>
                <label htmlFor="fineaggregate">Fine Aggregate: <input type="text" name='fine' id='fineaggregate'/></label>
                <label htmlFor="slag">Slag: <input type="text" name='slag' id='slag' /></label>
                <label htmlFor="ash">Ash: <input type="text" name='ash' id='ash' /></label>
                <label htmlFor="superplasticizer">Superplasticizer: <input type="text" name='superplasticizer' id='superplasticizer' /></label>
                <button type='submit'>Predict</button>
            </form>
            {prediction !== null && <DisplayPrediction prediction={prediction} />}
        </>
        
    );
}