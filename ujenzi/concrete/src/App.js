import React from 'react';
import { useState, useEffect } from 'react';
import SaveForm from './SaveForm';
import SavePredictionBtn from './SavePredictionBtn';


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

    useEffect(() => {
        const displayedResult = document.querySelector('#displayStrength');
        if (displayedResult) {
            const value = displayedResult.getAttribute('data-strength');
            setStrength(value); 
        }
    });

    const handleInitialSave = () => {
        setShowButton(false);
        setShowForm(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(e.target);

        // Post to backend database and save
        const response = await fetch('save', {
            method: 'POST',
            body: formData,
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
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmit={handleSubmit}/>}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave}/>}
        </div>

    )

}

