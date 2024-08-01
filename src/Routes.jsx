// import { Children } from "react";

import App from "./App";
import Shop from "./Shop";
import ErrorPage from "./components/ErrorPage";


const Routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: 'shop',
        element: <Shop />,
    },
    // {
    //     path: 'product/:productId',
    //     element: <ProductDetail />
    // }
];

export default Routes;