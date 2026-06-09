import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useToastStore } from '../../store/useToastStore'

const colorMap = {
  success: 'bg-fourth text-text',
  info: 'bg-fourth text-text',
  error: 'bg-error text-black',
  warn: 'bg-warn text-black',
}

export type ToastMessageType = keyof typeof colorMap

type Props = {
  id: number
  message: string
  type: ToastMessageType
}

export default function ToastMessage({ id, message, type }: Props) {
  const removeToast = useToastStore((state) => state.removeToast)
  const [show, setShow] = useState(true)

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Transition
      show={show}
      appear
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
      afterLeave={() => removeToast(id)}  // clean up store after animation
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded shadow-md ${colorMap[type]}`}>
        <span className="flex-1 text-sm">{message}</span>
        <button onClick={() => setShow(false)} className="cursor-pointer opacity-70 hover:opacity-100">✕</button>
      </div>
    </Transition>
  )
}