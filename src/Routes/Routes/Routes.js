import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../../Layouts/MainLayout";
import Category from "../../Pages/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import News from "../../Pages/News/News/News";
import RequreAuth from "../RequreAuth/RequreAuth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                loader: () => fetch("http://localhost:5000/news"),
                element: <Home />
            },
            {
                path: "/category/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`),
                element: <RequreAuth><Category /></RequreAuth>
            },
            {
                path: "/news/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/news/${params.id}`),
                element: <RequreAuth><News /></RequreAuth>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);