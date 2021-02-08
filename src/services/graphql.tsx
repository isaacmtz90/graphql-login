import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';

const httpLink = createHttpLink({
    uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql',
    fetch,
});
const link = ApolloLink.from([httpLink]);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
