import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../hoc/Layout/Layout.js';
import { Home } from '../views/Home/Home';
import { Login } from '../views/Login/Login';
import { Register } from '../views/Register/Register';
import { Users } from '../views/Users/Users';
import { UserUpdate } from '../views/Users/UserUpdate';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/user/update/:id' component={UserUpdate} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
