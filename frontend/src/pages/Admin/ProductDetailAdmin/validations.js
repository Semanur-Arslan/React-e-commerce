import * as yup from 'yup';

const editSchema = yup.object().shape({
    title: yup
        .string()
        .required(),
    description: yup
        .string()
        .required()
        .min(5),
    price: yup
        .string()
        .required()
})

export default editSchema;