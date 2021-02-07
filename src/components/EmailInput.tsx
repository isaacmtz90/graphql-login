import React from 'react';

import { FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';

type EmailInputProps = {
    label?: string;
};

export const EmailInput = ({
    field,
    form,
    ...props
}: FieldProps & EmailInputProps): JSX.Element => {
    const { name } = field;
    const error = form.errors[name] || false;
    const touched = form.touched[name] || false;
    return (
        <TextField
            type="text"
            variant="outlined"
            name={name}
            id={name}
            placeholder={name}
            error={!!error && !!touched}
            helperText={error ? error : ''}
            {...props}
        />
    );
};
