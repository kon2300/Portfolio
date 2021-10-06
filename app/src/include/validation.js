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
  rent_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  food_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  householeditem_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  utility_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  riberalarts_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  internet_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  insurance_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  entertainment_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  free_expenses: yup
    .number()
    .min(0, '0以上で入力してください')
    .required('入力は必須です')
    .typeError('数値を入力してください'),
  comment: yup.string().required('入力は必須です'),
})

export const userSchema = yup.object({
  name: yup.string().required('入力は必須です'),
  age: yup.string().required('入力は必須です'),
  annual_income: yup.string().required('入力は必須です'),
  family_members: yup.string().required('入力は必須です'),
})
