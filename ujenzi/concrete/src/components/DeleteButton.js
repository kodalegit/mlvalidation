import React from 'react';

export default function DeleteButton({ onDelete }) {
    return (
        <button onClick={onDelete}>Delete</button>
    )
}