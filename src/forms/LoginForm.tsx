import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { AlertBox } from '../components/AlertBox';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { SubmitButton } from '../components/SubmitButton';
import { makeStyles } from '@material-ui/core/styles';
import {
    ApolloError,
    FetchResult,
    MutationFunctionOptions,
    useMutation,
} from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '../api/mutations/login';
import * as Yup from 'yup';
import { FormikProps, Field, withFormik } from 'formik';
import { setSession } from '../utils/auth';
import { LoginResponse } from '../api/types/loginResponseType';
import { IInheritedProps } from '../App';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface IFormValues {
    email: string;
    password: string;
}
interface ICustomFormProps extends IInheritedProps {
    initialEmail?: string;
    loginUser(
        options?: MutationFunctionOptions,
    ): Promise<FetchResult<LoginResponse>>;
    loginError: ApolloError | undefined;
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

const FormikWrappedForm = withFormik<ICustomFormProps, IFormValues>({
    // Transform  props into form values
    mapPropsToValues: (props) => {
        return {
            email: props.initialEmail || '',
            password: '',
        };
    },
    // Validates the form fields using YUP
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Please enter a valid email'),
        password: Yup.string().required('Please enter your password'),
    }),
    // Handles the submit and sets the token accordingly
    handleSubmit: async (values, { props }) => {
        const { loginUser } = props;
        const loginResponse = await loginUser({
            variables: values,
        });
        // Set the session token
        const jwt = loginResponse?.data?.login?.jwt;
        setSession(jwt || '');
        console.log(props);
        console.log('redirect');
        props.history?.push('/account');
    },
})(InnerLoginForm);

const ConnectedLoginForm = (props: IInheritedProps): JSX.Element => {
    console.log(props);
    // Hook to handle the login action and any error that might happen
    const [loginUser, { error: mutationError }] = useMutation(LOGIN_MUTATION);
    return (
        <>
            <FormikWrappedForm
                loginUser={loginUser}
                loginError={mutationError}
                {...props}
            />
            {mutationError && (
                <AlertBox
                    severity={'error'}
                    message={'Invalid Credentials, please try again'}
                />
            )}
        </>
    );
};

export const LoginForm = withRouter(ConnectedLoginForm);
