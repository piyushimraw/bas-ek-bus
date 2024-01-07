import * as yup from 'yup';

export const userValidatio = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email id should be valid').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
  })
  .required();

export const seatUserValidation = yup.lazy((obj) => {
  const shape = Object.keys(obj).reduce(
    (acc, key) => {
      acc[key] = userValidatio;
      return acc;
    },
    {} as unknown as Record<string, typeof userValidatio>,
  );
  return yup.object().shape(shape);
});
