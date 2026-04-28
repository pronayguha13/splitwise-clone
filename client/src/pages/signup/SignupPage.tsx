import { AuthLayout } from '../../shared/components/AuthLayout'
import { SignupForm } from './components/SignupForm'
import { signupCopy } from './utils/signupCopy.util'

export function SignupPage() {
  return (
    <AuthLayout
      mode="signup"
      subtitle={signupCopy.subtitle}
      title={signupCopy.title}
    >
      <SignupForm />
    </AuthLayout>
  )
}
