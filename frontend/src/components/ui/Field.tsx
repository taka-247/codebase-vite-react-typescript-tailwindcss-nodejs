import { Field as HField, Label, Description } from '@headlessui/react'
import type { ReactNode } from 'react'

type Props = {
  label: string
  note?: string
  error?: string
  children: ReactNode
}

export default function Field({ label, note, error, children }: Props) {
  return (
    <HField>
      <Label className="block mb-1 font-medium text-text">{label}
        {
          note && (
            <small className='ml-2'>{note}</small>
          )
        }
      </Label>
      <div className="[&>input]:w-full [&>input]:border [&>input]:border-border [&>input]:rounded [&>input]:px-3 [&>input]:py-2
                      [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-border [&>textarea]:rounded [&>textarea]:px-3 [&>textarea]:py-2">
        {children}
      </div>
      {error && (
        <Description className="text-error text-sm mt-1">{error}</Description>
      )}
    </HField>
  )
}