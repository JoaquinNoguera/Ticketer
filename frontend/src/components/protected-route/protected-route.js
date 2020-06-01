import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = function ({ logedIn, children, ...otherProps }) {
    if (logedIn)
        return <Route { ...otherProps } > { children } </Route>
    else
        return <Redirect to='/loggin' />
}

export default ProtectedRoute;