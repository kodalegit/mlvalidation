import React from 'react';
import UndoButton from './UndoButton';
import DeleteButton from './DeleteButton';

export function SampleRow({ description, date, prediction, onDelete, deletedSample, handleUndo }) {
    return (

        deletedSample ? (
            <tr> <td colSpan="4">Sample deleted. <UndoButton handleUndo={handleUndo} /></td></tr>
        ) : (
            <tr>
                <td>{description}</td>
                <td>{date}</td>
                <td>{prediction}</td>
                <td><DeleteButton onDelete={onDelete} /></td>
            </tr>
        )
    )
}
