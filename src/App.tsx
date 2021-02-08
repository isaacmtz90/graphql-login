import './App.css';
import React, { ReactElement } from 'react';
import { PrivateRoute } from './components/PrivateRoute';
import { ApolloClient } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Account } from './containers/Account';
import { Login } from './containers/Login';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './services/graphql';

export interface IInheritedProps {
    client?: ApolloClient<Record<string, null>>;
    history?: RouteComponentProps['history'];
}
function App(): ReactElement {
    return (
        <Router>
            <div>
                <ApolloProvider client={client}>
                    <Switch>
                        <PrivateRoute path="/account" component={Account} />
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </ApolloProvider>
            </div>
        </Router>
    );
}

export default App;
