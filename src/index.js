import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
import Documents from './Pages/Documents.jsx';
import Products from './Pages/Products.jsx';
import Services from './Pages/Services.jsx';
import MarketFinder from './Pages/MarketFinder.jsx';
import Task from './Pages/Tasks.jsx';
import Tutorials from './Pages/Tutorials.jsx';

import AdminLogin from './admin/Pages/Login.jsx';
import AdminSelect from './admin/Pages/SelectCustomer.jsx';
import AdminDashboard from './admin/Pages/Dashboard.jsx';
import AdminProfile from './admin/Pages/Profile.jsx';
import AdminDocuments from './admin/Pages/Documents.jsx';
import AdminProducts from './admin/Pages/Products.jsx';
import AdminServices from './admin/Pages/Services.jsx';
import AdminMarketFinder from './admin/Pages/MarketFinder.jsx';
import AdminTask from './admin/Pages/Tasks.jsx';
import AdminTutorials from './admin/Pages/Tutorials.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { store } from "./redux/app/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/kayit",
    element: <Register/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/Panel",
    element: <Dashboard />,
  },
  {
    path: "/Profil",
    element: <Profile />, 
  },
  {
    path: "/Belgelerim",
    element: <Documents />, 
  },
  {
    path: "/Ürünler",
    element: <Products />, 
  },
  {
    path: "/Ürünler",
    element: <Products />, 
  },
  {
    path: "/Urunler",
    element: <Products />, 
  },
  {
    path: "/Hizmetler",
    element: <Services />, 
  },
  {
    path: "/MarketFinder",
    element: <MarketFinder />, 
  },
  {
    path: "/Proje",
    element: <Task />, 
  },
  {
    path: "/Dersler",
    element: <Tutorials />, 
  },
  {
    path: "/admin/",
    element: <AdminLogin/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/MusteriSec",
    element: <AdminSelect />,
  },
  {
    path: "/admin/Panel",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/Profil",
    element: <AdminProfile />, 
  },
  {
    path: "/admin/Belgelerim",
    element: <AdminDocuments />, 
  },
  {
    path: "/admin/Ürünler",
    element: <AdminProducts />, 
  },
  {
    path: "/admin/Ürünler",
    element: <AdminProducts />, 
  },
  {
    path: "/admin/Urunler",
    element: <AdminProducts />, 
  },
  {
    path: "/admin/Hizmetler",
    element: <AdminServices />,
  },
  {
    path: "/admin/MarketFinder",
    element: <AdminMarketFinder />, 
  },
  {
    path: "/admin/Proje",
    element: <AdminTask />, 
  },
  {
    path: "/admin/Dersler",
    element: <AdminTutorials />, 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
