import type { ButtonHTMLAttributes, ReactNode } from 'react'
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Burron({ children, className, ...rest }: IProps) {
  return (
    <>
      <button className={`${className} p-2 text-white w-full rounded-sm cursor-pointer`} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Burron