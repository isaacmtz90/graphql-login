import React from 'react';

import styled from 'styled-components';
import { AccountForm } from '../forms/AccountForm';
import { IInheritedProps } from '../App';

const Heading = styled.h1`
    font-size: 65px;
    margin: 10px;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Account = (props: IInheritedProps): JSX.Element => {
    console.log('account');
    return (
        <FormWrapper>
            <Heading>User Account</Heading>
            <AccountForm {...props} />
        </FormWrapper>
    );
};
