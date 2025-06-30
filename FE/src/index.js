import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { UserProvider } from "./providers/user-provider";
import { Provider } from "react-redux";
import store from "./redux/store";
import Product from "./pages/product/Product";
import Admin from "./pages/admin";
import FormLogin from "./pages/login/FormLogin";
import FormSignup from "./pages/signup/FormSignup";
import withAuth from "./hocs/withAuth";
import Cart from "./components/Cart/Cart";
import DetailProduct from "./pages/detailproduct/DetailProduct";
import CheckOutSuccess from "./components/Checkout/CheckOutSuccess";
import InfoOrder from "./components/InfoOrder/InfoOrder";
import OrderDetail from "./components/InfoOrder/OrderDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/*",
    element: <Admin />,
  },
  {
    path: "/FormLogin",
    element: <FormLogin />,
  },
  {
    path: "/FormSignup",
    element: <FormSignup />,
  },
  {
    path: "/product-category/:id",
    element: <Product />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/detail-product/:id",
    element: <DetailProduct/>,
  },
  {
    path:"/cart",
    element:<Cart/>,
  },
  {
    path:"/info-order/*",
    element:<InfoOrder/>
  },
  {
    path:"/order-detail/:id",
    element:< OrderDetail/>
  },
  {
    path:"/checkout-success",
    element:<CheckOutSuccess/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = withAuth(() => <RouterProvider router={router} />);
root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
  
);
reportWebVitals();
