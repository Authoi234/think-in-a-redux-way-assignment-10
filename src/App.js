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
import AdminLogin from './pages/adminDashboard/AdminLogin';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboardLayout from './layout/admin/AdminDashboardLayout';
import AdminPublicRoute from './Routes/AdminPublicRoute';
import Dashboard from './pages/adminDashboard/Dashboard';
import Videos from './pages/adminDashboard/Videos';
import UpdateVideo from './pages/adminDashboard/UpdateVideo';
import AdminQuizzes from './pages/adminDashboard/AdminQuizzes';
import UpdateQuizzes from './pages/adminDashboard/UpdateQuizzes';
import Assignments from './pages/adminDashboard/Assignments';
import UpdateAssignment from './pages/adminDashboard/UpdateAssignment';
import AssignemntMarks from './pages/adminDashboard/AssignemntMarks';

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
    },
    {
      path: "/admin",
      element: <StudentIdentifyLayout></StudentIdentifyLayout>,
      children: [
        {
          path: "/admin/login",
          element: <AdminPublicRoute><AdminLogin></AdminLogin></AdminPublicRoute>
        },
      ]
    },
    {
      path: "/admin",
      element: <AdminDashboardLayout></AdminDashboardLayout>,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminRoute><Dashboard></Dashboard></AdminRoute>
        },
        {
          path: "/admin/videos",
          element: <AdminRoute><Videos></Videos></AdminRoute>
        },
        {
          path: "/admin/quizzes",
          element: <AdminRoute><AdminQuizzes></AdminQuizzes></AdminRoute>
        },
        {
          path: "/admin/editVideo/:videoId",
          element: <AdminRoute><UpdateVideo></UpdateVideo></AdminRoute>
        },
        {
          path: "/admin/editQuiz/:quizId",
          element: <AdminRoute><UpdateQuizzes></UpdateQuizzes></AdminRoute>
        },
        {
          path: "/admin/assignments",
          element: <AdminRoute><Assignments></Assignments></AdminRoute>
        },
        {
          path: "/admin/editAssignment/:assignmentId",
          element: <AdminRoute><UpdateAssignment></UpdateAssignment></AdminRoute>
        },
        {
          path: "/admin/assignmentMarks",
          element: <AdminRoute><AssignemntMarks></AssignemntMarks></AdminRoute>
        },
      ]
    },
  ])

  return (
    <div className="">
      <RouterProvider key={userLoggedIn} router={router} />

    </div>
  );
}

export default App;
