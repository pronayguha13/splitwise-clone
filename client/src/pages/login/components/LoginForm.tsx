import { Link } from 'react-router-dom'
import { FormField } from '../../../shared/components/FormField'
import { loginInitialValues } from '../helpers/loginForm.helper'
import { loginCopy } from '../utils/loginCopy.util'

export function LoginForm() {
  return (
    <form className="auth-form">
      <FormField
        autoComplete="email"
        defaultValue={loginInitialValues.email}
        id="login-email"
        label="Email address"
        name="email"
        placeholder="alex@example.com"
        type="email"
      />
      <FormField
        autoComplete="current-password"
        defaultValue={loginInitialValues.password}
        id="login-password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />

      <div className="form-options">
        <label className="checkbox-field">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <a href="/forgot-password">Forgot password?</a>
      </div>

      <button className="primary-button" type="submit">
        {loginCopy.submitLabel}
      </button>

      <p className="auth-switch">
        New to Splitwise clone? <Link to="/signup">Create an account</Link>
      </p>
    </form>
  )
}
