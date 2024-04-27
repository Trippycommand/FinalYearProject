import { InputHTMLAttributes } from 'react'

export default function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm">
        {label}
        <input
          {...props}
          className="block w-full border-b-2 border-gray-600 bg-transparent py-2 text-base text-white hover:border-purple-600"
        />
      </label>
    </div>
  )
}
