import { Link } from 'react-router-dom'
import { FormField } from '../../../shared/components/FormField'
import { signupInitialValues } from '../helpers/signupForm.helper'
import { signupCopy } from '../utils/signupCopy.util'

export function SignupForm() {
  return (
    <form className="auth-form">
      <FormField
        autoComplete="name"
        defaultValue={signupInitialValues.fullName}
        id="signup-full-name"
        label="Full name"
        name="fullName"
        placeholder="Alex Morgan"
        type="text"
      />
      <FormField
        autoComplete="email"
        defaultValue={signupInitialValues.email}
        id="signup-email"
        label="Email address"
        name="email"
        placeholder="alex@example.com"
        type="email"
      />
      <FormField
        autoComplete="new-password"
        defaultValue={signupInitialValues.password}
        id="signup-password"
        label="Password"
        name="password"
        placeholder="Create a password"
        type="password"
      />

      <label className="checkbox-field terms-field">
        <input type="checkbox" />
        <span>I agree to the terms and privacy policy.</span>
      </label>

      <button className="primary-button" type="submit">
        {signupCopy.submitLabel}
      </button>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  )
}
