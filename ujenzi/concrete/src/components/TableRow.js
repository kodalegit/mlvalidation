import React from 'react';

export function SampleRow({ description, date, prediction }){
    return (
        <tr>
            <td>{description}</td>
            <td>{date}</td>
            <td>{prediction}</td>
        </tr>
    );
}
