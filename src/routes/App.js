import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../views/Home/Home';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
