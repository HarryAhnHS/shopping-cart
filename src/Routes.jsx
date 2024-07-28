// import { Children } from "react";

import App from "./App";
import Shop from "./components/Shop";
import ErrorPage from "./components/ErrorPage";
// import ProductDetails


const Routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: 'products',
        element: <Shop />,

        // children: [
        //     {
        //         path: '/:productID',
        //         element: <ProductDetails />
        //     }
        // ]
    }
];

export default Routes;