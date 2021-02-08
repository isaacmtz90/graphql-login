import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(input: { identifier: $email, password: $password }) {
            jwt
        }
    }
`;
