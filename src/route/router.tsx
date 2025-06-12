import ProductContainer from "../component/product/ProductContainer";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../component/cart/Cart";
import Purchase from "../component/Purchase";
import ProductDetail from "../component/product/ProductDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "product",
        element: <ProductContainer />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "product/:id", 
        element: <ProductDetail />,
      },
    ]
  },
]);
export default router;