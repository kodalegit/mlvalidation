import React from 'react';
import { useState, useEffect } from 'react';
import SaveForm from './SaveForm';
import SavePredictionBtn from './SavePredictionBtn';
import PredictForm from './PredictForm';
import { DisplayPrediction } from './DisplayPrediction';


export default function App(){
    const [strength, setStrength] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [csrfToken, setCsrfToken] = useState('');     

    // Obtain csrf token for form submission
    useEffect(() => {
        fetch('csrf')
        .then((response) => response.json())
        .then((data) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error(error));
    }, []);

    // useEffect(() => {
    //     const displayedResult = document.querySelector('#displayStrength');
    //     if (displayedResult) {
    //         const value = displayedResult.getAttribute('data-strength');
    //         setStrength(value); 
    //     }
    // });

    const onSubmit = async (e) => {
        e.preventDefault()

        //Gather form data
        const concreteInfo = new FormData(e.target);
        const responseBody = Object.fromEntries(concreteInfo);

        // Fetch strength prediction from backend
        let response = await fetch('predict', {
            method: 'POST',
            body: JSON.stringify(responseBody),
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrfToken,
            }
        });

        if (response.ok){
            const predictedStrength = await response.json();
            setStrength(predictedStrength.prediction)
        }
        else{
            console.error('Failed to fetch strength prediction. Response status:', response.status)
        }              
     
    }

    const handleInitialSave = () => {
        setShowButton(false);
        setShowForm(true);
    }

    const handleSubmission = async (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(e.target);
        const respBody = Object.fromEntries(formData);

        // Post to backend database and save
        const response = await fetch('save', {
            method: 'POST',
            body: JSON.stringify(respBody),
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrfToken,
            }
        });
        
        const data = await response.json();


        setShowForm(false);
        setShowButton(true);
    }
    
    const handleCancel = () => {
        setShowForm(false);
        setShowButton(true);
    }

    return (
        <div>
            <PredictForm onSubmit={onSubmit}/>
            {strength !== null && <DisplayPrediction strength={strength} />}
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmission={handleSubmission}/>}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave}/>}
        </div>

    )

}

