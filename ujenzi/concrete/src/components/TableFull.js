import React from 'react';
import { SampleRow } from './TableRow';

export default function SampleTable({ samples }){
    return (
        <div>
            <h3>Samples</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Predicted Compressive Strength</th>
                    </tr>
                </thead>
                <tbody>
                {samples.length === 0 ? (
                    <tr colSpan="3"><td>No samples saved.</td></tr> 
                ) : (
                samples.map(sample => {
                    return (
                    <SampleRow key={sample.id}
                    description={sample.description}
                    date={sample.date}
                    prediction={sample.prediction}
                    /> )
                })
                )}
                </tbody>
            </table>
        </div>              
    );
}