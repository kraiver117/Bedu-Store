import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Address } from '../components/Address/Address.js';
import { MakeOrder } from '../components/MakeOrder/MakeOrder.js';
import { OrderDetail } from '../components/Order/OrderDetail.js';
import { Payment } from '../components/Payment/Payment.js';
import { Layout } from '../hoc/Layout/Layout.js';
import { Home } from '../views/Home/Home';
import { Login } from '../views/Login/Login';
import { ProductDetails } from '../views/Products/ProductDetails.js';
import { CreateProduct } from '../views/Products/CreateProduct.js';
import { UpdateProduct } from '../views/Products/UpdateProduct.js';
import { Products } from '../views/Products/Products.js';
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
                    <Route exact path='/address' component={Address} />
                    <Route exact path='/payment' component={Payment} />
                    <Route exact path='/makeorder' component={MakeOrder} />
                    <Route exact path='/order-detail' component={OrderDetail} />
                    <Route exact path='/product/:id' component={ProductDetails} />
                    <Route exact path='/admin/productlist' component={Products} />
                    <Route exact path='/admin/createproduct' component={CreateProduct} />
                    <Route exact path='/admin/product/:id/edit' component={UpdateProduct} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
