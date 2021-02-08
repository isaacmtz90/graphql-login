import { gql } from '@apollo/client';

// user id should be hardcoded?
export const USER_QUERY = gql`
    query user {
        user(id: 2) {
            id
            email
            firstName
            lastName
        }
    }
`;
