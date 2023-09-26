import React from 'react';
import { useForm } from 'react-hook-form';

// Form that is used to save to edit entry and save to database
function SaveForm({ strength, handleCancel, handleSubmission }){
    const form = useForm({
        defaultValues: {
            description: "",
            strength: strength,
        },
        mode: 'OnBlur',
    });
    const { register, handleSubmit, formState: { errors }, } = form;

    return (
        <div>
            <form onSubmit={handleSubmit(handleSubmission)} noValidate>
                <div className='form-group'>
                    <label>Sample Description: </label><input
                    {...register('description', {
                        maxLength: 32,
                        pattern: {
                        value: /^[a-zA-Z0-9\s]*$/,
                        message: 'Description limited to 32 characters',
                        },
                    })}
                    type='text' name='description' className={`form-control ${errors.description && 'is-invalid'}`}></input>
                    <div className='invalid-feedback'>{errors.description?.message}</div>                
                </div>
                <div className='form-group'>
                    <label>Compressive Strength(MPa): </label><input
                    {...register('strength', {
                        valueAsNumber: true,
                        pattern: {
                        value: /^[0-9]*$/,
                        message: 'Only positive numeric values are allowed',
                        },
                    })} 
                    type='number' name='strength' className={`form-control ${errors.strength && 'is-invalid'}`}></input>
                    <div className='invalid-feedback'>{errors.strength?.message}</div>
                </div>
                
                <input type='submit' value='Save' className='btn btn-primary'></input>
                <button onClick={handleCancel} className='btn btn-primary'>Cancel</button>
            </form>
        </div>
    )
}

export default SaveForm;