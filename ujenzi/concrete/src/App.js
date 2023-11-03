import React from 'react';
import { useState, useEffect } from 'react';
import SaveForm from './components/SaveForm';
import SavePredictionBtn from './components/SavePredictionBtn';
import PredictForm from './components/PredictForm';
import SampleTable from './components/TableFull';
import { DisplayPrediction } from './components/DisplayPrediction';
import { Alert } from './components/Alert';
import LoadingBtn from './components/LoadingBtn';


export default function App() {
    const [strength, setStrength] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [color, setColor] = useState('');
    const [samples, setSamples] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Obtain csrf token for form submission
    useEffect(() => {
        fetch('csrf')
            .then((response) => response.json())
            .then((data) => setCsrfToken(data.csrfToken))
            .catch((error) => console.error(error));
    }, []);

    // Load saved samples by user
    useEffect(() => {
        fetch(`save?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                setSamples(data.samples)
                setTotalPages(data.total_pages)
            })
            .catch(error => console.error(error));
    }, [currentPage]);


    const onSubmit = async (data, event) => {
        event.preventDefault();

        // Hide the form and alert and show the save prediction button when predicting
        setShowForm(false);
        setShowButton(true);
        setAlert(false);
        setLoading(true);

        try {
            // Fetch strength prediction from backend
            let response = await fetch('predict', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });

            if (response.ok) {
                setLoading(false);
                const predictedStrength = await response.json();
                setStrength(predictedStrength.prediction);
            }
            else {
                setLoading(false);
                console.error('Failed to fetch strength prediction. Invalid request. Response status:', response.status);
                setMessage('Error fetching prediction. Try again.');
                setColor('red');
                setAlert(true);
            }

        } catch (err) {
            console.error('Encountered error: ', err);
            setMessage('Error fetching prediction. Log in and try again.');
            setColor('red');
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
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });

            const res = await response.json();

            if (response.ok) {
                console.log(res.message);

                //Update saved samples
                setSamples(res.samples);
                setTotalPages(res.total_pages);

                // Display success message to the user
                setMessage('Save Successful');
                setColor('green');
                setAlert(true);
            }
            else {
                console.error(res.error);

                // Display error message to the user
                setMessage('Invalid request. Try again.');
                setColor('red');
                setAlert(true);
            }


        } catch (err) {
            console.error('Encountered error: ', err);
            setMessage('Invalid request. Log in and try again.');
            setColor('red');
            setAlert(true);
        }

    }

    const handleCancel = () => {
        setShowForm(false);
    }

    // Delete entry from database
    const onDelete = async (id) => {
        try {
            const response = await fetch(`delete/${id}`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                }
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setSamples(data.samples);
                setTotalPages(data.total_pages);
            }
            else {
                console.error(data.error);

                // Display error message to the user
                setMessage('Deletion failed. Try again.');
                setColor('red');
                setAlert(true);
            }

        } catch (error) {
            console.error('Encountered error: ', err);
            setMessage('Request failed. Try again.');
            setColor('red');
            setAlert(true);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <PredictForm onSubmit={onSubmit} />
            {loading && <LoadingBtn />}
            {strength !== 0 && <DisplayPrediction strength={strength} />}
            {showForm && <SaveForm strength={strength} handleCancel={handleCancel} handleSubmission={handleSubmission} />}
            {showButton && <SavePredictionBtn handleInitialSave={handleInitialSave} />}
            {alert && <Alert color={color} message={message} />}
            <SampleTable samples={samples} onDelete={onDelete} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </div>

    )

}

