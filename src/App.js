import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentPortalLayout from './layout/student/StudentPortalLayout';
import StudentIdentifyLayout from './layout/student/StudentIdentifyLayout';
import Login from './pages/studentPortal/Login';
import Registration from './pages/studentPortal/Registration';
import "./style/output.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StudentIdentifyLayout></StudentIdentifyLayout>,
      children: [
        {
          path: "/",
          element: <Login></Login>
        },
        {
          path: "/registration",
          element: <Registration></Registration>
        }
      ]
    }
  ])

  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
