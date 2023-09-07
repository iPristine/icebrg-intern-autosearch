import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import {LoginPage} from "./pages/login";
import {SearchPage} from "./pages/search";
import {PrivateRoute} from "./components/private-route";

const router = createBrowserRouter([
    {
        path: "/search",
        element: <PrivateRoute><SearchPage /></PrivateRoute>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <Navigate to="/login" />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider router={router} />
);