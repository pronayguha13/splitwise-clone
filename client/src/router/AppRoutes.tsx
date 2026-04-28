import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { SignupPage } from '../pages/signup/SignupPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}
