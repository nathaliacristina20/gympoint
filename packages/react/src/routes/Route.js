import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import { store } from '~/store';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { signed } = store.getState().auth;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/alunos" />;
    }

    const Layout = signed ? DefaultLayout : AuthLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} title={rest.title} />
                </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
    title: PropTypes.string,
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
};

RouteWrapper.defaultProps = {
    title: '',
    isPrivate: false,
};
