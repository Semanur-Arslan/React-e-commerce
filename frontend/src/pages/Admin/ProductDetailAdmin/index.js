import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail, updateProduct } from '../../../Api';
import { Formik, FieldArray, Field } from 'formik';
import validationSchema from './validations'

export default function ProductDetailAdmin() {

    const [successMessage, setSuccessMessage] = useState(false);
    const { product_id } = useParams();
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["productDataAdmin", product_id],
        queryFn: () => fetchProductDetail(product_id),
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error {error.message}</div>
    }

    const handleSubmit = async (values, bag) => {
        try {
            await updateProduct(values, product_id);
            setSuccessMessage(true)
            setTimeout(() => setSuccessMessage(false), 2000)
        } catch (e) {
            e.message.error('The product does not updated')
        }
    }

    return (
        <Formik
            initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.photos
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >

            {
                ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                    <>
                        {successMessage == true &&
                            <div class="toast toast-top toast-center z-10">
                                <div class="alert alert-success">
                                    <span>The product successfully updated</span>
                                </div>
                            </div>
                        }

                        <div className='flex justify-center'>
                            <form className='grid gap-4 w-full max-w-md m-4' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title" className="block text-sm text-accent">Title</label>
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        className={`input input-bordered input-primary w-full input-sm ${errors.title ? 'border-error' : ''}`}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                    />
                                    {touched.title && errors.title &&
                                        <div className="text-error text-sm mt-1">{errors.title}</div>}

                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm text-accent">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        className={`textarea textarea-bordered textarea-primary w-full textarea-md ${errors.description ? 'border-error' : ''}`}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                    />
                                    {touched.description && errors.description &&
                                        <div className="text-error text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm text-accent">Price</label>
                                    <Field
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        className={`input input-bordered input-primary w-full input-md ${errors.price ? 'border-error' : ''}`}
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                    />
                                    {touched.price && errors.price &&
                                        <div className="text-error text-sm mt-1">{errors.price}</div>}
                                </div>

                                <div>
                                    <label htmlFor="photos" className="block text-sm text-accent">Photos</label>
                                    <FieldArray
                                        name='photos'
                                        render={(arrayHelpers) => (
                                            <div>
                                                {
                                                    values.photos && values.photos.map((photo, index) => (
                                                        <div key={index} className='grid grid-cols-5 gap-2 mb-2'>
                                                            <Field
                                                                name={`photos.${index}`}
                                                                type="text"
                                                                placeholder="Photo"
                                                                className="input input-bordered input-primary w-full input-md col-span-4"
                                                                value={photo}
                                                                disabled={isSubmitting}
                                                                onChange={handleChange}
                                                            />
                                                            <button type="button" className="btn btn-error" onClick={() => arrayHelpers.remove(index)} disabled={isSubmitting}>Remove</button>
                                                        </div>
                                                    ))

                                                }
                                                <button type="button" className="btn btn-neutral btn-sm mt-2" onClick={() => arrayHelpers.push('')} disabled={isSubmitting}>Add a photo</button>
                                            </div>

                                        )}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button type="submit" className="btn btn-wide btn-primary" disabled={isSubmitting} >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span>
                                                Updating...
                                            </>
                                        ) : 'Update'}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </>
                )
            }

        </Formik>
    );
}
