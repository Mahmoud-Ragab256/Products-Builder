import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

function ColorCircle({ color, ...rest }: IProps) {

  return (
    <>
      <span className={`block w-5 h-5 rounded-full cursor-pointer border-2 border-gray-100`} style={{ backgroundColor: color }} {...rest}></span>
    </>
  )
}

export default ColorCircle