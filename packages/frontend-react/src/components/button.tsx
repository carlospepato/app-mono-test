import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onclick: () => void
}

export function Button({children, onclick} : ButtonProps){
  return (
    <button onClick={onclick} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  )
}