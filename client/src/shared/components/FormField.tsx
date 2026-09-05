import { Input } from 'antd'
import type { InputProps } from 'antd'

type FormFieldProps = InputProps & {
  id: string
  label: string
}

export function FormField({ id, label, ...inputProps }: FormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#17231f]" htmlFor={id}>
      <span>{label}</span>
      <Input id={id} size="large" {...inputProps} />
    </label>
  )
}
