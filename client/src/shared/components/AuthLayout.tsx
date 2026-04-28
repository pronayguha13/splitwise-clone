import type { ReactNode } from 'react'
import type { AuthMode } from '../types/auth'

type AuthLayoutProps = {
  children: ReactNode
  mode: AuthMode
  subtitle: string
  title: string
}

export function AuthLayout({ children, mode, subtitle, title }: AuthLayoutProps) {
  const activeUsers = mode === 'login' ? '24.8k' : '18.2k'
  const splitLabel = mode === 'login' ? 'April apartment' : 'Goa weekend'

  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="Splitwise clone preview">
        <div className="brand-mark" aria-hidden="true">
          <span>S</span>
        </div>

        <div className="brand-copy">
          <p className="eyebrow">Splitwise clone</p>
          <h1>Track shared expenses without losing the thread.</h1>
          <p>
            Keep groups, balances, and repayments clear from the first bill to
            the final settlement.
          </p>
        </div>

        <div className="expense-preview" aria-hidden="true">
          <div className="preview-header">
            <span>{splitLabel}</span>
            <strong>$142.80</strong>
          </div>
          <div className="balance-row owed">
            <span>You are owed</span>
            <strong>$76.40</strong>
          </div>
          <div className="balance-row due">
            <span>You owe</span>
            <strong>$21.20</strong>
          </div>
          <div className="participant-stack">
            <span>AR</span>
            <span>NK</span>
            <span>PM</span>
            <small>{activeUsers} groups active</small>
          </div>
        </div>
      </section>

      <section className="auth-form-panel" aria-labelledby="auth-title">
        <div className="auth-form-shell">
          <p className="eyebrow">Smart expense sharing</p>
          <h2 id="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  )
}
