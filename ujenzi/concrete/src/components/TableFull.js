import React, { useEffect, useState } from 'react';
import { SampleRow } from './TableRow';

export default function SampleTable({ samples, onDelete }) {
    const [deletedSample, setDeletedSample] = useState(null);
    const [undo, setUndo] = useState(false);

    // useEffect(() => {
    //     // If a sample has been deleted, provide the undo button for 5 seconds
    //     if (deletedSample) {
    //         const undoTimeout = setTimeout(() => {
    //             setDeletedSample(null);
    //         }, 5000);

    //         return () => clearTimeout(undoTimeout);
    //     }
    // }, [deletedSample]);


    const handleDelete = (id) => {
        // Log that a sample has been deleted
        const sampleToDelete = samples.find((sample) => { sample.id === id });
        setDeletedSample(sampleToDelete);

        const undoTimeout = setTimeout(() => {
            if (!undo) {
                onDelete(id);
                setDeletedSample(null);
            }
        }, 5000);

        // Clear the timeout if undo is clicked
        return () => clearTimeout(undoTimeout);

    };

    const handleUndo = () => {
        setUndo(true);
        setDeletedSample(null);
    }
    return (
        <div className='table-container'>
            <h3>Samples</h3>
            <table className='samples-table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Predicted Compressive Strength</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {samples.length === 0 ? (
                        <tr colSpan="4"><td>No samples saved.</td></tr>
                    ) : (
                        samples.map(sample => {
                            return (
                                <SampleRow key={sample.id}
                                    description={sample.description}
                                    date={sample.date}
                                    prediction={sample.prediction}
                                    onDelete={() => { handleDelete(sample.id) }}
                                    deletedSample={deletedSample}
                                    handleUndo={handleUndo}
                                />)
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}