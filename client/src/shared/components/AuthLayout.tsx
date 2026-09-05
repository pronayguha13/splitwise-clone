import { Avatar, Card, Space, Typography } from 'antd'
import type { ReactNode } from 'react'
import type { AuthMode } from '../types/auth'

const { Text, Title } = Typography

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
    <main className="grid h-svh min-h-0 overflow-hidden bg-[#f7faf7] lg:grid-cols-[minmax(360px,0.95fr)_minmax(420px,1.05fr)]">
      <section
        className="hidden min-h-0 flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_20%_18%,rgba(121,228,184,0.24),transparent_32%),linear-gradient(145deg,#113f36_0%,#172a43_56%,#281b4f_100%)] px-12 py-[clamp(16px,3svh,48px)] text-white lg:flex"
        aria-label="Splitwise clone preview"
      >
        <div className="max-w-[560px]">
          <Text className="mb-[clamp(12px,2svh,24px)] block !text-[14px] font-extrabold uppercase tracking-[0.14em] !text-[#9cf0c9]">
            Splitwise clone
          </Text>
          <Title className="!m-0 !text-[clamp(40px,min(7.6svh,6.6vw),84px)] !leading-[0.98] !text-white" level={1}>
            Track shared expenses without losing the thread.
          </Title>
          <Text className="mt-[clamp(14px,2.8svh,32px)] block max-w-[520px] !text-[clamp(16px,2.2svh,22px)] !leading-[1.45] !text-white/70">
            Keep groups, balances, and repayments clear from the first bill to
            the final settlement.
          </Text>
        </div>

        <Card
          className="mt-[clamp(20px,5svh,80px)] w-full max-w-[484px] backdrop-blur-md [&_.ant-card-body]:p-[clamp(18px,3svh,24px)]"
          aria-hidden="true"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.16)',
            borderRadius: 20,
            boxShadow: '0 24px 90px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-[clamp(14px,2.4svh,24px)] text-white/70">
            <Text className="!text-base !text-white/70">{splitLabel}</Text>
            <Text strong className="!text-[26px] !text-white">
              $142.80
            </Text>
          </div>
          <div className="mt-[clamp(10px,1.8svh,16px)] flex items-center justify-between gap-4 rounded-[14px] bg-white/10 px-5 py-[clamp(11px,2svh,16px)]">
            <Text className="!text-lg !text-white/70">You are owed</Text>
            <Text strong className="!text-lg !text-[#8ee3bf]">
              $76.40
            </Text>
          </div>
          <div className="mt-[clamp(10px,1.8svh,16px)] flex items-center justify-between gap-4 rounded-[14px] bg-white/10 px-5 py-[clamp(11px,2svh,16px)]">
            <Text className="!text-lg !text-white/70">You owe</Text>
            <Text strong className="!text-lg !text-[#ffcd8a]">
              $21.20
            </Text>
          </div>
          <div className="mt-[clamp(14px,2.6svh,24px)] flex items-center gap-2">
            <Avatar className="font-extrabold" size={38} style={{ background: '#ffffff', border: '2px solid rgba(20, 29, 40, 0.9)', color: '#173f37' }}>AR</Avatar>
            <Avatar className="font-extrabold" size={38} style={{ background: '#ffffff', border: '2px solid rgba(20, 29, 40, 0.9)', color: '#173f37' }}>NK</Avatar>
            <Avatar className="font-extrabold" size={38} style={{ background: '#ffffff', border: '2px solid rgba(20, 29, 40, 0.9)', color: '#173f37' }}>PM</Avatar>
            <Text className="ml-9 !text-base !text-white/70">{activeUsers} groups active</Text>
          </div>
        </Card>
      </section>

      <section
        className="grid min-h-0 place-items-center overflow-y-auto bg-[linear-gradient(180deg,rgba(35,145,116,0.08),transparent_34%),#f7faf7] px-6 py-12"
        aria-labelledby="auth-title"
      >
        <Space className="w-full max-w-[440px]" orientation="vertical" size={0}>
          <Text className="mb-4 block text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#457165]">
            Smart expense sharing
          </Text>
          <Title id="auth-title" className="!m-0 !text-[38px] !leading-tight !text-[#17231f]" level={2}>
            {title}
          </Title>
          <Text className="mb-7 mt-3 block text-[#66736d]">{subtitle}</Text>
          {children}
        </Space>
      </section>
    </main>
  )
}
