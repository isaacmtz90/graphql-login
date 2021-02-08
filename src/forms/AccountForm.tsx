import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { AlertBox } from '../components/AlertBox';
import { TextInput } from '../components/TextInput';
import { SubmitButton } from '../components/SubmitButton';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { USER_QUERY } from '../api/queries/user';
import { FormikProps, Field, withFormik } from 'formik';
import { logOut } from '../utils/auth';
import { UserResponse } from '../api/types/userResponseType';
import { IInheritedProps } from '../App';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface IFormValues {
    firstName: string;
    lastName: string;
}
interface ICustomFormProps extends IInheritedProps {
    userData: UserResponse;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 400,
        },
    },
}));

const InnerUserForm = (props: FormikProps<IFormValues>) => {
    const { isSubmitting, values, handleChange, handleBlur } = props;
    const classes = useStyles();

    return (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
            <Field
                name="firstName"
                value={values['firstName']}
                label="First Name"
                onChange={handleChange}
                disabled={true}
                component={TextInput}
                onBlur={handleBlur}
            />
            <Field
                name="lastName"
                value={values['lastName']}
                label="Last Name"
                onChange={handleChange}
                disabled={true}
                component={TextInput}
                onBlur={handleBlur}
            />
            <SubmitButton
                id="submit"
                text="Log Out"
                disabled={false}
                isSubmitting={isSubmitting}
            />
        </Form>
    );
};

const FormikWrappedForm = withFormik<ICustomFormProps, IFormValues>({
    // Transform  props into form values
    mapPropsToValues: (props) => {
        console.log(props);
        return {
            firstName: props.userData.user.firstName || '',
            lastName: props.userData.user.lastName || '',
        };
    },
    // Handles the submit and removes the token accordingly
    handleSubmit: async (values, { props }) => {
        logOut();
        props.history?.push('/');
    },
})(InnerUserForm);

const ConnectedUserForm = (props: IInheritedProps): JSX.Element => {
    console.log(props);
    // Hook to handle the login action and any error that might happen
    const { loading, error, data } = useQuery(USER_QUERY, {
        errorPolicy: 'all',
    });
    return (
        <>
            {loading && <h1>Loading...</h1>}
            {!loading && <FormikWrappedForm userData={data} {...props} />}
            {error && (
                <AlertBox
                    severity={'error'}
                    message={'Error loading user, please try again.'}
                />
            )}
        </>
    );
};

export const AccountForm = withRouter(ConnectedUserForm);
