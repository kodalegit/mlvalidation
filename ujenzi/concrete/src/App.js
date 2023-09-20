import React from 'react';
import { useState, useEffect } from 'react';
import SaveForm from './components/SaveForm';
import SavePredictionBtn from './components/SavePredictionBtn';
import PredictForm from './components/PredictForm';
import { DisplayPrediction } from './components/DisplayPrediction';


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

    const onSubmit = async (data, event) => {
        event.preventDefault();

        try {
            // Fetch strength prediction from backend
            let response = await fetch('predict', {
                method: 'POST',
                body: JSON.stringify(data),
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

        } catch (err){
            console.error('Encountered error: ', err)
        }
                    
    }

    const handleInitialSave = () => {
        setShowButton(false);
        setShowForm(true);
    }

    const handleSubmission = async (data, e) => {
        e.preventDefault();

        // Post to backend database and save
        try {
            const response = await fetch('save', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type':'application/json',
                    'X-CSRFToken':csrfToken,
                }
            });

            const res = await response.json();

            if (response.ok){
                console.log(res.message)
            }
            else{
                console.error(res.error);
            }
           

        } catch (err){
            console.error('Encountered error: ', err)
        }     

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
            {strength !== 0 && <DisplayPrediction strength={strength} />}
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmission={handleSubmission}/>}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave}/>}
        </div>

    )

}

