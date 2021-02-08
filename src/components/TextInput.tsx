import React from 'react';

import { FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';

type TextInputProps = {
    label?: string;
};

export const TextInput = ({
    field,
    form,
    ...props
}: FieldProps & TextInputProps): JSX.Element => {
    const { name } = field;
    const error = !!form.errors[name] || false;
    const touched = !!form.touched[name] || false;
    return (
        <TextField
            type="text"
            variant="outlined"
            name={name}
            id={name}
            error={error && touched}
            helperText={error && touched ? form.errors[name] : ''}
            {...props}
        />
    );
};
