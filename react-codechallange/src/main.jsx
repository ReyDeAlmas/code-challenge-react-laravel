import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PlaylistProvider } from './context/PlaylistProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlaylistProvider>
      <RouterProvider router={router} />
    </PlaylistProvider>
  </React.StrictMode>
)
