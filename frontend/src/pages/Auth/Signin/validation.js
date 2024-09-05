import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup
    .string()
    .email()
    .required(),
    password: yup
    .string()
    .min(8, "password length must be at least 8 characters long")
    .required(),
})

export default validations;