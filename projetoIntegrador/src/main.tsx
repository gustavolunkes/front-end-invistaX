import { createRoot } from 'react-dom/client'
import './index.css'
import { routerApp } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContexts'  

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={routerApp} />
  </AuthProvider>
)
