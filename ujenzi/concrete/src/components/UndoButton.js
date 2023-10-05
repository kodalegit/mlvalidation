import React from 'react';

export default function UndoButton({ handleUndo }) {
    return (
        <button onClick={() => handleUndo()}>Undo</button>
    )
}