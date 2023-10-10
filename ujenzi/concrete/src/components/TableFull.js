import React, { useEffect, useState } from 'react';
import { SampleRow } from './TableRow';

export default function SampleTable({ samples, onDelete }) {
    const [deletedSample, setDeletedSample] = useState([]);

    useEffect(() => {
        // If a sample has been deleted, provide the undo button for 3 seconds
        const undoTimeout = setTimeout(() => {
            if (deletedSample) {
                deletedSample.forEach(sampleId => {
                    onDelete(sampleId);
                });

                // Clear the deletedSample array after processing deletions
                setDeletedSample([]);

            }
        }, 5000);

        return () => clearTimeout(undoTimeout);

    }, [deletedSample]);


    const handleDelete = (id) => {
        // Log that a sample has been deleted
        const sampleToDelete = samples.find((sample) => sample.id === id);
        setDeletedSample(samplesToDelete => [...samplesToDelete, sampleToDelete.id]);

    };

    const handleUndo = (id) => {
        // Update deleted samples array to exclude the undone sample
        setDeletedSample((samplesToDelete) => samplesToDelete.filter((sampleId) => sampleId !== id));
    };

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
                                    {...sample}
                                    onDelete={() => { handleDelete(sample.id) }}
                                    deletedSample={deletedSample}
                                    handleUndo={() => { handleUndo(sample.id) }}
                                />)
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}