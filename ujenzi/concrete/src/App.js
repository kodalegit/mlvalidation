import React from 'react';
import { useState, useEffect } from 'react';
import SaveForm from './components/SaveForm';
import SavePredictionBtn from './components/SavePredictionBtn';
import PredictForm from './components/PredictForm';
import SampleTable from './components/TableFull';
import { DisplayPrediction } from './components/DisplayPrediction';
import { Alert } from './components/Alert';


export default function App(){
    const [strength, setStrength] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [samples, setSamples] = useState([]);

    // Obtain csrf token for form submission
    useEffect(() => {
        fetch('csrf')
        .then((response) => response.json())
        .then((data) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error(error));
    }, []);

    // Load saved samples by user
    useEffect(() => {
        fetch('save')
        .then(response => response.json())
        .then(data => setSamples(data.samples))
        .catch(error => console.error(error));
    }, []);

    const onSubmit = async (data, event) => {
        event.preventDefault();

        // Hide the form and alert and show the save prediction button when predicting
        setShowForm(false);
        setShowButton(true);
        setAlert(false);

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
                setStrength(predictedStrength.prediction);
            }
            else{
                console.error('Failed to fetch strength prediction. Response status:', response.status);
                setMessage('Error fetching prediction. Log in and try again.');
                setAlert(true);
            }

        } catch (err){
            console.error('Encountered error: ', err);
            setMessage('Error fetching prediction. Try again.');
            setAlert(true);
        }
                    
    }

    const handleInitialSave = () => {
        setShowButton(false);
        setShowForm(true);
    }

    const handleSubmission = async (data, e) => {
        e.preventDefault();

        // Hide the form after saving prediction
        setShowForm(false);

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

                // Display success message to the user
                setMessage('Save Successful');
                setAlert(true);
            }
            else{
                console.error(res.error);

                // Display error message to the user
                setMessage('Invalid request. Try again.');
                setAlert(true);
            }
           

        } catch (err){
            console.error('Encountered error: ', err);
            setMessage('Invalid request. Try again.');
            setAlert(true);
        }     

    }
    
    const handleCancel = () => {
        setShowForm(false);
    }


    return (
        <div>
            <PredictForm onSubmit={onSubmit}/>
            {strength !== 0 && <DisplayPrediction strength={strength} />}
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmission={handleSubmission}/>}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave}/>}
            {alert && <Alert message={message} />}
            <SampleTable samples={samples} />
        </div>

    )

}

