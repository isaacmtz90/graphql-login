import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { getSession } from '../utils/auth';

export const PrivateRoute = ({
    component: Component,
    ...rest
}: RouteProps): JSX.Element | null => {
    if (!Component) return null;
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={(props) =>
                getSession() ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default PrivateRoute;
