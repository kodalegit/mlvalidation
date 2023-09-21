import React from 'react';

export function SampleRow({ description, time, prediction }){
    return (
        <tr>
            <td>{description}</td>
            <td>{time}</td>
            <td>{prediction}</td>
        </tr>
    );
}
