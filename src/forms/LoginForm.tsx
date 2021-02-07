import React from 'react';
import styled from 'styled-components';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { SubmitButton } from '../components/SubmitButton';
import { makeStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import { FormikProps, Field, withFormik } from 'formik';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface IFormValues {
    email: string;
    password: string;
}
interface ICustomFormProps {
    initialEmail?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 400,
        },
    },
}));

const InnerLoginForm = (props: FormikProps<IFormValues>) => {
    const {
        isSubmitting,
        values,
        handleChange,
        handleBlur,
        isValid,
        touched,
    } = props;
    const classes = useStyles();

    return (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
            <Field
                name="email"
                value={values['email']}
                label="Email"
                onChange={handleChange}
                component={EmailInput}
                onBlur={handleBlur}
            />
            <Field
                name="password"
                value={values['password']}
                label="Password"
                onChange={handleChange}
                component={PasswordInput}
                onBlur={handleBlur}
            />
            <SubmitButton
                id="submit"
                disabled={!isValid || !touched.email}
                text="Login"
                isSubmitting={isSubmitting}
            />
        </Form>
    );
};

export const LoginForm = withFormik<ICustomFormProps, IFormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
        return {
            email: props.initialEmail || '',
            password: '',
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email'),
        password: Yup.string().required('Please enter your password'),
    }),
    handleSubmit: (values) => {
        console.log('submitting');
        console.log(values);
    },
})(InnerLoginForm);
