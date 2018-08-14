import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class RedirectIfAuth extends React.PureComponent {
  render() {
    const {
      path,
      props,
      component: Component,
      isAuthenticated,
    } = this.props;
    return (
      <Route
        path={path}
        render={
          (routerProps) => {
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

RedirectIfAuth.propTypes = {
  path: PropTypes.string.isRequired,
  props: PropTypes.objectOf(PropTypes.any),
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

RedirectIfAuth.defaultProps = {
  props: {},
};

export default RedirectIfAuth;
