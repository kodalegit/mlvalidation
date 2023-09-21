import React from 'react';
import { useForm } from 'react-hook-form';

// Predict form that submits to backend to obtain strength
function PredictForm({ onSubmit }){
    // Set up react-hook-form
    const form = useForm({
        defaultValues: {
            cement: '0',
            age: '28',
            water: '0',
            ash: '0', 
            fine: '0',
            coarseaggr: '0',
            superplasticizer: '0',
            slag: '0',
        },
        mode: "OnBlur"
    });
    const { register, handleSubmit, formState: { errors }, } = form;

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="cement">Cement: <input
                {...register('cement', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='cement' id='cement' /></label>
                 <p className='error'>{errors.cement?.message}</p>
                <label htmlFor="age">Age: <input
                {...register('age', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                    min: {
                        value: 1,
                        message: 'Age must be at least 1',
                    },
                    max: {
                        value: 365,
                        message: 'Age cannot exceed 365',
                    },
                })}
                 type="text" name='age' id='age' /></label>
                 <p className='error'>{errors.age?.message}</p>
                <label htmlFor="water">Water: <input
                {...register('water', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="number" name='water' id='water' /></label>
                 <p className='error'>{errors.water?.message}</p>
                <label htmlFor="coarseaggr">Coarse Aggregate: <input
                {...register('coarseaggr', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='coarseaggr' id='coarseaggr' /></label>
                 <p className='error'>{errors.coarseaggr?.message}</p>
                <label htmlFor="fine">Fine Aggregate: <input
                {...register('fine', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='fine' id='fine'/></label>
                 <p className='error'>{errors.fine?.message}</p>
                <label htmlFor="slag">Slag: <input
                {...register('slag', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='slag' id='slag' /></label>
                 <p className='error'>{errors.slag?.message}</p>
                <label htmlFor="ash">Ash: <input
                {...register('ash', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='ash' id='ash' /></label>
                 <p className='error'>{errors.ash?.message}</p>
                <label htmlFor="superplasticizer">Superplasticizer: <input
                {...register('superplasticizer', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                 type="text" name='superplasticizer' id='superplasticizer' /></label>
                 <p className='error'>{errors.superplasticizer?.message}</p>
                <button type='submit'>Predict</button>
            </form>
        </div>
    );
}

export default PredictForm;