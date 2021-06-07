import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Address } from '../components/Address/Address.js';
import { MakeOrder } from '../components/MakeOrder/MakeOrder.js';
import { OrderDetails } from '../views/Orders/OrderDetails.js';
import { Payment } from '../components/Payment/Payment.js';
import { Layout } from '../hoc/Layout/Layout.js';
import { Home } from '../views/Home/Home';
import { Login } from '../views/Login/Login';
import { ProductDetails } from '../views/Products/ProductDetails.js';
import { CreateProduct } from '../views/Products/CreateProduct.js';
import { UpdateProduct } from '../views/Products/UpdateProduct.js';
import { Products } from '../views/Products/Products.js';
import { Register } from '../views/Register/Register';
import { Profile } from '../views/Profile/Profile.js';
import { Orders } from '../views/Orders/Orders.js';
import { Users } from '../views/Users/Users';
import { UpdateUser } from '../views/Users/UpdateUser';
import { ShoppingCart } from '../views/Cart/ShoppingCart.js';
import { PageNotFound } from '../views/PageNotFound/PageNotFound.js';
import { ProductsStore } from '../views/Store/ProductsStore.js';
import { SearchResults } from '../views/SearchResults/SearchResults.js';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/admin/user/:id/edit' component={UpdateUser} />
                    <Route exact path='/address' component={Address} />
                    <Route exact path='/payment' component={Payment} />
                    <Route exact path='/makeorder' component={MakeOrder} />
                    <Route exact path='/order/:id' component={OrderDetails} />
                    <Route exact path='/search/:keyword' component={SearchResults} />
                    <Route exact path='/search/:keyword/page/:pageNumber' component={SearchResults} />
                    <Route exact path='/product/:id' component={ProductDetails} />
                    <Route exact path='/cart/:id?' component={ShoppingCart} />
                    <Route exact path='/store/:page?' component={ProductsStore} />
                    <Route exact path='/admin/productlist' component={Products} />
                    <Route exact path='/admin/createproduct' component={CreateProduct} />
                    <Route exact path='/admin/product/:id/edit' component={UpdateProduct} />
                    <Route exact path='/admin/orderslist' component={Orders} />
                    <Route path='*' component={PageNotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};
