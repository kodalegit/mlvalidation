import React from 'react';

// Form that is used to save to edit entry and save to database
function SaveForm({ strength, handleCancel, handleSubmit }){
    return (
        <>
        <form>
            <label>Sample Description: <input name='description'></input></label>
            <label>Compressive Strength: <input name='strength' defaultValue={strength}></input></label>
            <input type='submit' value='Save' onClick={handleSubmit}></input>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        </>
    )
}

export default SaveForm;