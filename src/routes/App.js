import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../views/Home/Home';
import { Login } from '../views/Login/Login';
import { Register } from '../views/Register/Register';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
