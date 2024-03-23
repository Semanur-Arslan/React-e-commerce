import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Lütfen geçerli bir email girin.")
    .required("Zorunlu alan."),
    email: yup
    .string()
    .min(8, "Parolanız en az 8 karakter olmalıdır")
    .required("Zorunlu alan."),
})

export default validations;