import React, { ReactElement } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Login } from './containers/Login';
import { Account } from './containers/Account';

function App(): ReactElement {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
