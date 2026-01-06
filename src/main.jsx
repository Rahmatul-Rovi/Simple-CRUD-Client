import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import UserDetail from './components/UserDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <App></App>
      },
      {
        path: "/users/:id",
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
        element: <UserDetail></UserDetail>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
