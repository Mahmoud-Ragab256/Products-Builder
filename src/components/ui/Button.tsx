import type { ButtonHTMLAttributes, ReactNode } from 'react'
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: string
}

function Button({ children, className, width = "w-full", ...rest }: IProps) {
  return (
    <>
      <button className={`${className} ${width} p-2 text-white rounded-sm cursor-pointer`} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button