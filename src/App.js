import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentPortalLayout from './layout/student/StudentPortalLayout';
import StudentIdentifyLayout from './layout/student/StudentIdentifyLayout';
import Login from './pages/studentPortal/Login';
import Registration from './pages/studentPortal/Registration';
import "./style/output.css";
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import Course from './pages/studentPortal/Course';
import { userLoggedIn } from './features/auth/authSlice';
import Quizzes from './pages/studentPortal/Quizzes';
import Leaderboard from './pages/studentPortal/Leaderboard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StudentIdentifyLayout></StudentIdentifyLayout>,
      children: [
        {
          path: "/",
          element: <PublicRoute><Login></Login></PublicRoute>
        },
        {
          path: "/registration",
          element: <PublicRoute><Registration></Registration></PublicRoute>
        }
      ]
    },
    {
      path: "/StudentPortal",
      element: <StudentPortalLayout></StudentPortalLayout>,
      children: [
        {
          path: "/StudentPortal/course",
          element: <PrivateRoute><Course></Course></PrivateRoute>
        },
        {
          path: "/StudentPortal/quizzes/:videoId",
          element: <PrivateRoute><Quizzes></Quizzes></PrivateRoute>
        },
        {
          path: "/StudentPortal/leaderboard",
          element: <PrivateRoute><Leaderboard></Leaderboard></PrivateRoute>
        },
      ]
    }
  ])

  return (
    <div className="">
     <RouterProvider key={userLoggedIn} router={router} />

    </div>
  );
}

export default App;
