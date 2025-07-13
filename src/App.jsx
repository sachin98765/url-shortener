
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from '@/layouts/app-layout.jsx'
import RedirectLink from './pages/redirect-link'
import LandingPage from './pages/landing.jsx'
import Dashboard from './pages/dashboard.jsx'
import Auth from './pages/auth.jsx'
import Link from './pages/link.jsx'
import { RouterProvider } from 'react-router-dom'
import UrlProvider from './context.jsx'

import RequireAuth from './components/require-auth.jsx'
import Header from './components/header.jsx'


const router=createBrowserRouter([{
  element: <AppLayout />,
  children: [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
      <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: '/auth',
      element: <Auth />
    },
    {
      path: '/link/:id',
      element: (
        <RequireAuth>
          <Link />
        </RequireAuth>
      )
    },
    {
      path: '/:id',
      element: <RedirectLink />
    },
  ],
},
])

function App() {

  return <UrlProvider>  
    <RouterProvider router={router} />
</UrlProvider>
}

export default App
