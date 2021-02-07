import React from 'react';
import styled from 'styled-components';
import { LoginForm } from '../forms/LoginForm';

const Heading = styled.h1`
    font-size: 65px;
    margin: 10px;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Login = (): JSX.Element => (
    <FormWrapper>
        <Heading>GraphQL Login</Heading>
        <LoginForm />
    </FormWrapper>
);
