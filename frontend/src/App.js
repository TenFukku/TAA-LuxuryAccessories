import Cart from 'pages/Cart/Cart';
import ScrollButton from 'components/Common/ScrollButton';
import {
  Route,
  Router,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AboutUs from './pages/AboutUs/AboutUs';
import Error404 from './pages/Error404';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import NewsPost from './pages/NewsPost/NewsPost';
import Policy from './pages/Policy/Policy';
import OrderManual from './pages/OrderManual/OrderManual';
import Products from './pages/Products/Products';
import RootLayout from './routes/RootLayout';
import Order from 'pages/Order/Order';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import Register from 'pages/LoginRegister/Register';
import Login from 'pages/LoginRegister/Login';
import Account from './pages/Account/index';
import { Fragment } from 'react';
import OrderPayment from './pages/Order/OrderPayment';
const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<RootLayout></RootLayout>} errorElement={<Error404 />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} /> 
      <Route path="products/category/:cate_type_name" element={<Products />} />
      <Route path="products/category/:cate_type_name/:cate_name" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetail />} />
      
      {/* <Route path="blog" element={<News />} /> */}
      
      <Route path="search" element={<Products />} />
      <Route path="news" element={<News />} />
      <Route path="news/:newsId" element={<NewsPost />} />
      <Route path="about_us" element={<AboutUs />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order" element={<Order />} />
      <Route path="order/payment" element={<OrderPayment />} />

      <Route path="guideline" element={<OrderManual />}>
        {' '}
      </Route>
      <Route path="policy" element={<Policy />}>
        {' '}
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="log_in" element={<Login />} />
      <Route path="/account/:nav" element={<Account />} />
      <Route path="/account/:nav/:subnav" element={<Account />} />
    </Route>,

  ),
);



function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <ScrollButton />
    </Fragment>
  );
}

export default App;
