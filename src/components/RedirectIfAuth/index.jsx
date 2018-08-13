import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class RedirectIfAuth extends React.PureComponent {
  render() {
    const { path, props, component: Component, isAuthenticated } = this.props;
    return (
      <Route
        path={path}
        render={
          routerProps => {
            
            if (!isAuthenticated) {
              return (
                <Component
                  {...routerProps}
                  {...props}
                />
              );
            }

            return <Redirect to="/" />;
          }
        }
      />
    );
  }
}

export default RedirectIfAuth;