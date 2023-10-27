import React from 'react';
import { useForm } from 'react-hook-form';

// Form that is used to save to edit entry and save to database
function SaveForm({ strength, handleCancel, handleSubmission }) {
    const form = useForm({
        defaultValues: {
            description: "",
            strength: strength,
        },
        mode: 'OnBlur',
    });
    const { register, handleSubmit, formState: { errors }, } = form;

    return (
        <div className='react-components'>
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

                <input type='submit' value='Save' className='btn btn-success' style={{ marginTop: '0.4rem' }} ></input>
                <button onClick={handleCancel} className='btn btn-danger' style={{ marginLeft: '0.4rem', marginTop: '0.4rem' }}>Cancel</button>
            </form>
        </div >
    )
}

export default SaveForm;