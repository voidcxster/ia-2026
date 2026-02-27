import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import FileManager from './FileManager.tsx'
import Quiz from "./Quiz.tsx"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<FileManager />}
          />
          <Route
            path="/quiz"
            element={<Quiz />}
          />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
