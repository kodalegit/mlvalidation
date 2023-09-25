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
        ` <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-group'>
              <label htmlFor="cement">Cement(kg/m<sup>3</sup>): </label><input
                {...register('cement', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                  type="number" name='cement' id='cement' className='form-control' />
              <p className='error'>{errors.cement?.message}</p>
            </div>

            <div className='form-group'>
              <label htmlFor="age">Age(days): </label><input
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
                  type="number" name='age' id='age' className='form-control' />
              <p className='error'>{errors.age?.message}</p>
            </div>                            

            <div className='form-group'>
              <label htmlFor="water">Water(kg/m<sup>3</sup>): </label><input
                {...register('water', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                  type="number" name='water' id='water' className='form-control' />
              <p className='error'>{errors.water?.message}</p>            
            </div>                

            <div className='form-group'>
              <label htmlFor="coarseaggr">Coarse Aggregate(kg/m<sup>3</sup>): </label><input
                {...register('coarseaggr', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                type="number" name='coarseaggr' id='coarseaggr' className='form-control' />
              <p className='error'>{errors.coarseaggr?.message}</p>            
            </div>                

            <div className='form-group'>
              <label htmlFor="fine">Fine Aggregate(kg/m<sup>3</sup>): </label><input
                {...register('fine', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                type="number" name='fine' id='fine' className='form-control' />
              <p className='error'>{errors.fine?.message}</p>            
            </div>                

            <div className='form-group'>
              <label htmlFor="slag">Slag(kg/m<sup>3</sup>): </label><input
                {...register('slag', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                type="number" name='slag' id='slag' className='form-control' />
              <p className='error'>{errors.slag?.message}</p>            
            </div>                

            <div className='form-group'>
              <label htmlFor="ash">Ash(kg/m<sup>3</sup>): </label><input
                {...register('ash', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                type="number" name='ash' id='ash' className='form-control' />
              <p className='error'>{errors.ash?.message}</p>
            </div>                

            <div className='form-group'>
              <label htmlFor="superplasticizer">Superplasticizer(kg/m<sup>3</sup>): </label><input
                {...register('superplasticizer', {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Only numeric values are allowed',
                    },
                })}
                type="number" name='superplasticizer' id='superplasticizer' className='form-control' />
              <p className='error'>{errors.superplasticizer?.message}</p>            
            </div>                

            <button type='submit' className='btn btn-primary'>Predict</button>
          </form>
        </div>
    );
}

export default PredictForm;