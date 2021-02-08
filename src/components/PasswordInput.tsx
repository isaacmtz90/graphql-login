import React from 'react';
import TextField from '@material-ui/core/TextField';

import { FieldProps } from 'formik';
type PasswordInputProps = {
    label?: string;
    value: string;
};

export const PasswordInput = ({
    field,
    form,
    ...props
}: FieldProps & PasswordInputProps): JSX.Element => {
    const { name } = field;
    const error = !!form.errors[name] || false;
    const touched = !!form.touched[name] || false;
    return (
        <TextField
            type="password"
            variant="outlined"
            name={name}
            id={name}
            error={error && touched}
            helperText={error && touched ? form.errors[name] : ''}
            {...props}
        />
    );
};
