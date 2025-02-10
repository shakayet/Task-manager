import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from '../Component/Main/Main';
import Home from '../Component/Main/Home/Home';
import Login from '../Component/Main/Login/Login';
import SignUp from '../Component/Main/Signup/Signup';
import ForgotPassword from '../Component/Main/ForgotPassword/ForgotPassword';
import TaskForm from '../Component/Main/Task/TaskForm';
import Profile from '../Component/Main/Profile/Profile';
import Tasks from '../Component/Main/Tasks/Tasks';

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/forgot',
        element: <ForgotPassword></ForgotPassword>
      },
      {
        path: '/form',
        element: <TaskForm></TaskForm>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        path: '/task',
        element: <Tasks></Tasks>
      }
    ]
  },
]);

export default Routes;