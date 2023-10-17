import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

export function SampleRow({ description, date, prediction, id, onDelete, deletedSample, handleUndo }) {
    return (

        deletedSample && deletedSample.includes(id) ? (
            <tr><td colSpan="3">Sample deleted. </td><td><button className='font-awesome-undo' onClick={handleUndo}><FontAwesomeIcon icon={faRotateLeft} /></button></td></tr>
        ) : (
            <tr>
                <td>{description}</td>
                <td>{date}</td>
                <td>{prediction}</td>
                <td><button className='font-awesome-delete' onClick={onDelete}><FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
        )
    )
}
