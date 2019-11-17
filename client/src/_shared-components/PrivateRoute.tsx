import * as React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { AuthService } from '../services/auth.service'

interface PrivateRouteProps extends RouteProps {
  children: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        AuthService.isAuthenticated ? (
          Component
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location }
              }}
            />
          )
      }
    />
  );
};

export default PrivateRoute;
