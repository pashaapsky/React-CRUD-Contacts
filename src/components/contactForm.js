import React from 'react';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function ContactForm({className, buttonTitle, handleSubmit, values, id}) {
    const history = useHistory();

    const validationSchema = yup.object({
        name: yup
            .string('Введите имя контакта')
            .required('Поле Имя обязательно'),
        phone: yup
            .string('Введите номер контакта')
            .required('Поле Номер обязательно'),
    });

    const formik = useFormik({
        initialValues: {
            name: values?.name || '',
            phone: values?.phone || ''
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            console.log('work');
            console.log(values, id);
            handleSubmit(values, id);
        }
    });

    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <TextField
                id="name"
                name="name"
                label="Имя контакта"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
                id="phone"
                name="phone"
                label="Телефон"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />

            <Button color="secondary" size="small" variant="contained" type="submit">
                {buttonTitle || 'submit'}
            </Button>
        </form>
    );
}

export default ContactForm;