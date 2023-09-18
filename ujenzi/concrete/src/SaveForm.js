import React from 'react';
import { useForm } from 'react-hook-form';

// Form that is used to save to edit entry and save to database
function SaveForm({ strength, handleCancel, handleSubmission }){
    form = useForm({
        defaultValues: {
            description: "",
            strength: {strength},
        },
        mode: 'OnBlur',
    });
    const { register, handleSubmit, formState: { errors }, } = form;

    return (
        <div>
            <form>
                <label>Sample Description: <input
                {...register('description', {
                    maxLength: 32,
                    pattern: {
                    value: /^[a-zA-Z0-9\s]*$/,
                    message: 'Description limited to 64 characters',
                    },
                })}
                type='text' name='description'></input></label>
                <p className='error'>{errors.description?.message}</p>
                <label>Compressive Strength: <input
                {...register('strength', {
                    valueAsNumber: true,
                    pattern: {
                    value: /^[0-9]*$/,
                    message: 'Only numeric values are allowed',
                    },
                })} 
                type='number' name='strength'></input></label>
                <input type='submit' value='Save' onClick={handleSubmit}></input>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default SaveForm;