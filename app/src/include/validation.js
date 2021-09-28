import * as yup from 'yup'

export const signInSchema = yup.object({
  email: yup
    .string()
    .required('入力は必須です')
    .email('Emailの形式で入力してください'),
  password: yup
    .string()
    .required('入力は必須です')
    .min(7, '7文字以上入力してください'),
})

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required('入力は必須です')
    .email('Emailの形式で入力してください'),
  password: yup
    .string()
    .required('入力は必須です')
    .min(7, '7文字以上入力してください'),
  passwordConfirmation: yup
    .string()
    .required('入力は必須です')
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),
})

export const postEntrySchema = yup.object({
  title: yup.string().required('入力は必須です'),
  content: yup
    .string()
    .required('入力は必須です')
    .max(141, '140文字以内で入力してください'),
})
