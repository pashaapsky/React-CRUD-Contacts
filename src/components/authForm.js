import React from 'react';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function AuthForm({className, buttonTitle, handleSubmit}) {
    const history = useHistory();

    const validationSchema = yup.object({
        email: yup
            .string('Введите ваш email')
            .email('Введите корректный email')
            .required('Поле Email обязательно'),
        password: yup
            .string('Введите пароль')
            .min(6, 'Длина пароля минимум 6 символов')
            .required('Поле password обязательно'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            handleSubmit(values);

            history.push('/profile');
        }
    });

    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
                fullWidth
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />

            <Button color="secondary" variant="contained" fullWidth type="submit">
                {buttonTitle || 'submit'}
            </Button>
        </form>
    );
}

export default AuthForm;