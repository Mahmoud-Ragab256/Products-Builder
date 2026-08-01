import type { InputHTMLAttributes } from "react"
import type { IInput } from "../../data/formInput/interface"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  input: IInput
}

function Input({ input, ...rest }: IProps) {
  return (
    <>
      <div className="flex flex-col gap-1 m-0">
        <label htmlFor={input.name} className="text-sm font-medium text-gray-700">{input.label}</label>
        <input type={input.type} name={input.name} id={input.name} placeholder={input.placeholder} {...rest} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
    </>
  )
}

export default Input