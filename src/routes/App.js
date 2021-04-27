import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Address } from '../components/Address/Address.js';
import { MakeOrder } from '../components/MakeOrder/MakeOrder.js';
import { OrderDetail } from '../components/Order/OrderDetail.js';
import { Payment } from '../components/Payment/Payment.js';
import { Layout } from '../hoc/Layout/Layout.js';
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
                    <Route exact path='/address' component={Address} />
                    <Route exact path='/payment' component={Payment} />
                    <Route exact path='/makeorder' component={MakeOrder} />
                    <Route exact path='/order-detail' component={OrderDetail} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
