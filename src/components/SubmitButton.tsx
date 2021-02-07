import React from 'react';
import Button from '@material-ui/core/Button';

type SubmitButtonProps = {
    id: string;
    disabled: boolean;
    isSubmitting: boolean;
    text: string;
};
export const SubmitButton = ({
    isSubmitting,
    text,
    id,
    disabled,
}: SubmitButtonProps): JSX.Element => {
    return (
        <Button
            variant="contained"
            color="primary"
            disabled={disabled || isSubmitting}
            type="submit"
            id={id}
        >
            {text}
        </Button>
    );
};
