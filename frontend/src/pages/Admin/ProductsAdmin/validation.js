import * as yup from 'yup';

const newProductSchema = yup.object().shape({
    title: yup
    .string()
    .required('Zorunlu alan'),
    description:yup
    .string()
    .required('Zorunlu alan')
    .min(5),
    price:yup
    .string()
    .required('Zotunlu alan')
})

export default newProductSchema;