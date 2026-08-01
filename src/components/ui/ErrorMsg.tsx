import type { ReactNode } from "react"

interface IProps {
  children: ReactNode;
}

function ErrorMsg({ children }: IProps) {
  return (
    <>
      {children && <span className="text-red-500 text-[10px]">{children}</span>}
    </>
  )
}

export default ErrorMsg