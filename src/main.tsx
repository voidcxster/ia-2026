import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import FileManager from '@pages/FileManager/FileManager.tsx';
import Quiz from "@pages/Quiz/Quiz.tsx"
import './index.css'
import Generator from "@pages/Generator/Generator.tsx"
import QuizOptions from "@pages/QuizOptions/QuizOptions";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<FileManager />}
          />
          <Route
            path="/quiz/:quizID"
            element={<Quiz />}
          />
          <Route
            path="/generator"
            element={<Generator />}
          />
          <Route
            path="/quizOptions/:quizID"
            element={<QuizOptions />}
          />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
