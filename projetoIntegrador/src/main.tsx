import { createRoot } from 'react-dom/client'
import './index.css'
import {routerApp}  from './App.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={routerApp}/>
)
