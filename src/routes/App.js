import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../hoc/Layout/Layout.js';
import { Home } from '../views/Home/Home';
import { Login } from '../views/Login/Login';
import { ProductEditScreen } from '../views/Products/ProductEditScreen.js';
import { Products } from '../views/Products/Products.js';
import { Register } from '../views/Register/Register';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/admin/productlist' component={Products} />
                    <Route exact path='/admin/product/:id/edit' component={ProductEditScreen} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
