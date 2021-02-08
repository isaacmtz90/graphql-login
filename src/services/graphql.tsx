import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('session_id');
    console.log('token', token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const link = authLink.concat(httpLink);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
