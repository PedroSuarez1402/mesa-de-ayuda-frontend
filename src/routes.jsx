/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { element, exact } from "prop-types";
import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
    { path: '/', exact: true, name: 'Home', element:()=><Navigate to="/login" replace />},
    { path: '/dashboard', name: 'Dashboard', element:()=>(<PrivateRoute><Dashboard/></PrivateRoute>)}
]

export default routes